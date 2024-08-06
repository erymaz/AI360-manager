import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import {getWaipifyMasterUserID} from "@/lib/services/userdetails";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const providerSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().allow(null).allow(""),
    type: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
    headquarters_city_id: Joi.string().allow(null).allow(""),
    headquarters_country_id: Joi.string().allow(null).allow(""),
    headquarters_address_line: Joi.string().allow(null).allow(""),
    headquarters_address_number: Joi.string().allow(null).allow(""),
    headquarters_zip_code: Joi.string().allow(null).allow(""),
    organization_id: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const masterUserId = await getWaipifyMasterUserID();

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let providers = [];
            if (req.query) {
                const {id, skip, limit, organization_creator_id, name} = req.query;
                const details: any = {where: {}};

                if (id) {
                    details["where"]["id"] = String(id);
                } else {
                    if (organization_creator_id) {
                        details["where"]["AND"] = {
                            OR: [
                                {organzation_creator_id: organization_creator_id},
                                {organzation_creator_id: masterUserId},
                            ],
                        };
                    }

                    if (name) {
                        details["where"]["name"] = {
                            contains: String(name),
                        };
                    }

                    if (skip && limit) {
                        details["skip"] = Number(skip);
                        details["limit"] = Number(limit);
                    }
                }
                providers = await prisma.providers.findMany(details);
            } else {
                providers = await prisma.providers.findMany();
            }
            return res.status(200).json({providers});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await providerSchema.validateAsync(data);
            const {organization_id, ...providerData} = data;
            const organization = await prisma.organizations.findFirstOrThrow({
                where: {id: organization_id},
            });

            const currentProvider = await prisma.providers.findFirst({
                where: {
                    name: providerData.name,
                    AND: {
                        OR: [
                            {organzation_creator_id: organization.creator_id},
                            {organzation_creator_id: masterUserId},
                        ],
                    },
                },
            });

            if (currentProvider) {
                return res.status(409).json({error: "Provider already exists"});
            }
            const provider = await prisma.providers.create({
                data: {
                    id: getNewUUID(),
                    organzation_creator_id: organization.creator_id,
                    created_at: new Date().toISOString(),
                    is_internal: false,
                    ...providerData,
                },
            });
            // Create solution from provider data
            await prisma.solutions.create({
                data: {
                    id: getNewUUID(),
                    name: providerData.name,
                    provider_id: provider.id,
                    organization_creator_id: organization.creator_id,
                }
            });
            return res.status(201).json({provider});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
