import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryToObjectiveSchema = Joi.object({
    entry_id: Joi.string(),
    objective_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {entry_to_objectives_id} = req.query;
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }
    if (req.method === "PUT") {
        try {
            await prisma.entry_to_objectives.findFirstOrThrow({
                where: {id: String(entry_to_objectives_id)},
            });
            const data = req.body;
            await entryToObjectiveSchema.validateAsync(data);
            if (req.body.entry_id) {
                await prisma.entries.findFirstOrThrow({
                    where: {id: req.body.entry_id},
                });
            }
            if (req.body.objective_id) {
                await prisma.organization_objectives.findFirstOrThrow({
                    where: {id: req.body.objective_id},
                });
            }
            const entry_to_objective = await prisma.entry_to_objectives.update({
                where: {id: String(entry_to_objectives_id)},
                data: req.body,
            });
            return res.status(201).json({entry_to_objective});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.entry_to_objectives.findFirstOrThrow({
                where: {id: String(entry_to_objectives_id)},
            });
            const entry_to_objective = await prisma.entry_to_objectives.delete({
                where: {id: String(entry_to_objectives_id)},
            });
            return res
                .status(200)
                .json({
                    entry_to_objective,
                    message: "Entry to objective deleted successfully",
                });
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
