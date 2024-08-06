import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToModelSchema = Joi.object({
    task_id: Joi.string(),
    model_id: Joi.string(),
    model_capabilities: Joi.string(),
    development_description: Joi.string(),
    suggested: Joi.boolean(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {taskToModelId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.task_to_model.findFirstOrThrow({
                where: {id: String(taskToModelId)},
            });
            const data = req.body;
            await taskToModelSchema.validateAsync(data);
            if (req.body.task_id) {
                await prisma.tasks.findFirstOrThrow({
                    where: {id: req.body.task_id},
                });
            }
            if (req.body.model_id) {
                await prisma.solutions.findFirstOrThrow({
                    where: {id: req.body.model_id},
                });
            }

            const task_to_model = await prisma.task_to_model.update({
                where: {id: String(taskToModelId)},
                data: req.body,
            });

            return res.status(201).json({task_to_model});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.task_to_model.findFirstOrThrow({
                where: {id: String(taskToModelId)},
            });
            const task_to_model = await prisma.task_to_model.delete({
                where: {id: String(taskToModelId)},
            });
            return res.status(200).json({
                task_to_model,
                message: "Task to model deleted successfully",
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
