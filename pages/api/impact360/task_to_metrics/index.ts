import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToMeticSchema = Joi.object({
    task_id: Joi.string().required(),
    metric_id: Joi.string().required(),
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
            let task_to_metrics = [];
            if (req.query.id) {
                task_to_metrics = await prisma.task_to_metrics.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                task_to_metrics = await prisma.task_to_metrics.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                task_to_metrics = await prisma.task_to_metrics.findMany();
            }
            return res.status(200).json({task_to_metrics});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await taskToMeticSchema.validateAsync(data);
            await prisma.tasks.findFirstOrThrow({
                where: {id: req.body.task_id},
            });
            await prisma.metrics.findFirstOrThrow({
                where: {id: req.body.metric_id},
            });
            const task_to_metric = await prisma.task_to_metrics.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({task_to_metric});
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
