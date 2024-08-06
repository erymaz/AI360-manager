import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToModelReviewSchema = Joi.object({
    task_to_model_id: Joi.string().required(),
    feasibility_criteria_id: Joi.string().required(),
    reviewer_organization_id: Joi.string().required(),
    entry_id: Joi.string().required(),
    score: Joi.number().required(),
    comment: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let task_to_model_reviews = [];
            if (req.query.id) {
                task_to_model_reviews = await prisma.task_to_model_reviews.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                task_to_model_reviews = await prisma.task_to_model_reviews.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                task_to_model_reviews = await prisma.task_to_model_reviews.findMany();
            }
            return res.status(200).json({task_to_model_reviews});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await taskToModelReviewSchema.validateAsync(data);
            await prisma.task_to_model.findFirstOrThrow({
                where: {id: req.body.task_to_model_id},
            });
            await prisma.feasibility_criteria.findFirstOrThrow({
                where: {id: req.body.feasibility_criteria_id},
            });
            await prisma.entries.findFirstOrThrow({
                where: {id: req.body.entry_id},
            });
            await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.reviewer_organization_id},
            });
            const task_to_model_review = await prisma.task_to_model_reviews.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({task_to_model_review});
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
