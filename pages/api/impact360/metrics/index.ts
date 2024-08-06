import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const metricSchema = Joi.object({
    name: Joi.string().required(),
    organization_id: Joi.string().required(),
    is_business_impact: Joi.boolean().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let metrics = [];
            if (req.query.id) {
                metrics = await prisma.metrics.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                metrics = await prisma.metrics.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                metrics = await prisma.metrics.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                metrics = await prisma.metrics.findMany();
            }
            return res.status(200).json({metrics});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await metricSchema.validateAsync(data);
            const {organization_id, ...metricsData} = data;
            await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.organization_id},
            });
            const metric = await prisma.metrics.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    organization_id: req.body.organization_id,
                    ...metricsData,
                },
            });
            return res.status(201).json({metric});
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
