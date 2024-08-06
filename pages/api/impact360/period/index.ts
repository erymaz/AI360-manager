import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const periodSchema = Joi.object({
    name: Joi.string().required(),
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
            let period = [];
            if (req.query.id) {
                period = await prisma.period.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                period = await prisma.period.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                period = await prisma.period.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                period = await prisma.period.findMany();
            }
            return res.status(200).json({period});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await periodSchema.validateAsync(data);

            const period = await prisma.period.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...data,
                },
            });
            return res.status(201).json({period});
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
