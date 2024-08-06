import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskSchema = Joi.object({
    name: Joi.string(),
    case_id: Joi.string(),
    description: Joi.string(),
    risk: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {taskId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.tasks.findFirstOrThrow({
                where: {id: String(taskId)},
            });
            const data = req.body;
            await taskSchema.validateAsync(data);
            if (req.body.case_id) {
                await prisma.cases.findFirstOrThrow({
                    where: {id: req.body.case_id},
                });
            }

            const task = await prisma.tasks.update({
                where: {id: String(taskId)},
                data: req.body,
            });

            return res.status(201).json({task});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.tasks.findFirstOrThrow({
                where: {id: String(taskId)},
            });
            const task = await prisma.tasks.delete({
                where: {id: String(taskId)},
            });
            return res
                .status(200)
                .json({task, message: "Task deleted successfully"});
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
