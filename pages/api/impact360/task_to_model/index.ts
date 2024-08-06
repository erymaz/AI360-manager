import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToModelSchema = Joi.object({
    task_id: Joi.string().required(),
    model_id: Joi.string().required(),
    model_capabilities: Joi.string().required(),
    development_description: Joi.string().required(),
    suggested: Joi.boolean().required(),
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
            let task_to_models = [];
            if (req.query.id) {
                task_to_models = await prisma.task_to_model.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                task_to_models = await prisma.task_to_model.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                task_to_models = await prisma.task_to_model.findMany();
            }
            return res.status(200).json({task_to_models});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await taskToModelSchema.validateAsync(data);
            await prisma.tasks.findFirstOrThrow({
                where: {id: req.body.task_id},
            });
            await prisma.models.findFirstOrThrow({
                where: {id: req.body.model_id},
            });
            const task_to_model = await prisma.task_to_model.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({task_to_model});
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
