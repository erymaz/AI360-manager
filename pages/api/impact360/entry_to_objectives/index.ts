import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryToObjectiveSchema = Joi.object({
    entry_id: Joi.string().required(),
    objective_id: Joi.string().required(),
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
            let entry_to_objectives = [];
            if (req.query.id) {
                entry_to_objectives = await prisma.entry_to_objectives.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                entry_to_objectives = await prisma.entry_to_objectives.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                entry_to_objectives = await prisma.entry_to_objectives.findMany();
            }
            return res.status(200).json({entry_to_objectives});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await entryToObjectiveSchema.validateAsync(data);
            await prisma.entries.findFirstOrThrow({
                where: {id: req.body.entry_id},
            });
            const data_arr = JSON.parse(JSON.stringify(data.objective_id));
            const array = data_arr.split(",");
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                await prisma.organization_objectives.findFirstOrThrow({
                    where: {id: element},
                });
            }
            const entry_to_objective = await prisma.entry_to_objectives.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    objective_id: JSON.stringify(data.objective_id),
                    ...req.body,
                },
            });
            return res.status(201).json({entry_to_objective});
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
