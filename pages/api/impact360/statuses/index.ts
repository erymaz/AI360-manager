import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const statusSchema = Joi.object({
    name: Joi.string().required(),
    hex_colour_value: Joi.string().required(),
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
            let statuses = [];
            if (req.query.id) {
                statuses = await prisma.statuses.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.name) {
                statuses = await prisma.statuses.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                statuses = await prisma.statuses.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                statuses = await prisma.statuses.findMany();
            }
            return res.status(200).json({statuses});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await statusSchema.validateAsync(data);
            await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.organization_id},
            });

            const status = await prisma.statuses.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...data,
                },
            });
            return res.status(201).json({status});
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
