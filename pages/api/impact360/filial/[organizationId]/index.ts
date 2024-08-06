import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import {getAuth} from "@clerk/nextjs/server";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";

const filialSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().allow(null).allow(""),
    address_number: Joi.string().allow(null).allow(""),
    zip_code: Joi.string().allow(null).allow(""),
    country_id: Joi.string().required(),
    deletable: Joi.boolean().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {organizationId} = req.query;
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let filials_data = [];
            if (req.query.id) {
                filials_data = await prisma.filials.findMany({
                    where: {
                        id: String(req.query.id),
                        organization_id: String(organizationId),
                    },
                });
            } else if (req.query.name) {
                filials_data = await prisma.filials.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                        organization_id: String(organizationId),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                filials_data = await prisma.filials.findMany({
                    where: {
                        organization_id: String(organizationId),
                    },
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                filials_data = await prisma.filials.findMany({
                    where: {
                        organization_id: String(organizationId),
                    },
                });
            }
            const filials = [];
            for (let index = 0; index < filials_data.length; index++) {
                const element = filials_data[index];
                const objectives_data: any = await prisma.metric_units.findFirst({
                    where: {
                        country_id: String(element.country_id),
                    },
                });
                filials.push({
                    ...element,
                    metric_info: {
                        id: objectives_data?.id,
                        metric_unit: objectives_data?.metric_unit,
                    },
                });
            }
            return res.status(200).json({filials});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await filialSchema.validateAsync(data);
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            const filial = await prisma.filials.create({
                data: {
                    id: getNewUUID(),
                    organization_id: String(organizationId),
                    updated_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({filial});
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