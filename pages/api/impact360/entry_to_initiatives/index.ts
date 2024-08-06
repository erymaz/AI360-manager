import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryToInitiativeSchema = Joi.object({
    entry_id: Joi.string().required(),
    initiative_id: Joi.string().required(),
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
            let entry_to_initiatives = [];
            if (req.query.id) {
                entry_to_initiatives = await prisma.entry_to_initiatives.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                entry_to_initiatives = await prisma.entry_to_initiatives.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                entry_to_initiatives = await prisma.entry_to_initiatives.findMany();
            }
            return res.status(200).json({entry_to_initiatives});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await entryToInitiativeSchema.validateAsync(data);
            await prisma.entries.findFirstOrThrow({
                where: {id: req.body.entry_id},
            });
            const data_arr = JSON.parse(JSON.stringify(data.initiative_id));
            const array = data_arr.split(",");
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                await prisma.initiatives.findFirstOrThrow({
                    where: {id: element},
                });
            }
            const entry_to_initiative = await prisma.entry_to_initiatives.create({
                data: {
                    id: getNewUUID(),
                    initiative_id: JSON.stringify(data.initiative_id),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({entry_to_initiative});
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

