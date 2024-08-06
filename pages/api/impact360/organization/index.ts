import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect, AuthData} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const organizationSchema = Joi.object({
    name: Joi.string().required(),
    industry_id: Joi.string().required(),
    country_id: Joi.string().required(),
    is_superadmin: Joi.boolean().optional,
    is_supervisor: Joi.boolean().optional,
    locale_id: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    authData: AuthData
) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let organizations = [];
            if (req.query.id) {
                organizations = await prisma.organizations.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                organizations = await prisma.organizations.findMany({
                    where: {
                        name: String(req.query.name),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                organizations = await prisma.organizations.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                organizations = await prisma.organizations.findMany();
            }
            return res.status(200).json({organizations});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await organizationSchema.validateAsync(data);
            if (req.body.locale_id) {
                await prisma.locale.findFirstOrThrow({
                    where: {id: req.body.locale_id},
                });
            }
            await prisma.industries.findFirstOrThrow({
                where: {id: req.body.industry_id},
            });

            const organization_detail = await prisma.organizations.findFirst({
                where: {name: req.body.name},
            });

            if (organization_detail) {
                throw new Error("Organization name already exist!");
            }

            const organization = await prisma.organizations.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    waipify_organization_id: authData?.organisation?.tenantId,
                    creator_id: authData?.clerkUserId,
                    ...req.body,
                },
            });
            return res.status(201).json({organization});
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
