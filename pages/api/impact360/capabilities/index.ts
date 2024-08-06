import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const capabilitySchema = Joi.object({
    name: Joi.string().required(),
    model_id: Joi.string().required(),
    description: Joi.string().required(),
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
            let capabilities = [];
            if (req.query.id) {
                capabilities = await prisma.capabilities.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                capabilities = await prisma.capabilities.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                capabilities = await prisma.capabilities.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                capabilities = await prisma.capabilities.findMany();
            }
            return res.status(200).json({capabilities});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await capabilitySchema.validateAsync(data);
            await prisma.models.findFirstOrThrow({
                where: {id: req.body.model_id},
            });

            const capability = await prisma.capabilities.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({capability});
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
