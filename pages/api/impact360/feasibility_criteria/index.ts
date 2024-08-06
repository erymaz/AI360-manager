import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const feasibility_criteria_schema = Joi.object({
    name: Joi.string().required(),
    weight_multiplicative: Joi.number().required(),
    organization_id: Joi.string().required(),
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
            let feasibility_criteria = [];
            if (req.query.id) {
                feasibility_criteria = await prisma.feasibility_criteria.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                feasibility_criteria = await prisma.feasibility_criteria.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                feasibility_criteria = await prisma.feasibility_criteria.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                feasibility_criteria = await prisma.feasibility_criteria.findMany({
                    orderBy: [
                        {
                            name: "asc",
                        },
                    ],
                });
            }
            return res.status(200).json({feasibility_criteria});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await feasibility_criteria_schema.validateAsync(data);
            await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.organization_id},
            });

            const feasibility_criteria = await prisma.feasibility_criteria.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({feasibility_criteria});
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
