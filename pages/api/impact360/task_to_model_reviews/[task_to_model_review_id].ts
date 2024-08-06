import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToModelReviewSchema = Joi.object({
    task_to_model_id: Joi.string(),
    feasibility_criteria_id: Joi.string(),
    reviewer_organization_id: Joi.string(),
    entry_id: Joi.string(),
    score: Joi.number(),
    comment: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {task_to_model_review_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.task_to_model_reviews.findFirstOrThrow({
                where: {id: String(task_to_model_review_id)},
            });
            const data = req.body;
            await taskToModelReviewSchema.validateAsync(data);
            if (req.body.task_to_model_id) {
                await prisma.task_to_model.findFirstOrThrow({
                    where: {id: req.body.task_to_model_id},
                });
            }
            if (req.body.feasibility_criteria_id) {
                await prisma.feasibility_criteria.findFirstOrThrow({
                    where: {id: req.body.feasibility_criteria_id},
                });
            }
            if (req.body.entry_id) {
                await prisma.entries.findFirstOrThrow({
                    where: {id: req.body.entry_id},
                });
            }
            if (req.body.reviewer_organization_id) {
                await prisma.organizations.findFirstOrThrow({
                    where: {id: req.body.reviewer_organization_id},
                });
            }
            const task_to_model_review = await prisma.task_to_model_reviews.update({
                where: {id: String(task_to_model_review_id)},
                data: req.body,
            });

            return res.status(201).json({task_to_model_review});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.task_to_model_reviews.findFirstOrThrow({
                where: {id: String(task_to_model_review_id)},
            });
            const organization = await prisma.task_to_model_reviews.delete({
                where: {id: String(task_to_model_review_id)},
            });
            return res.status(200).json({
                organization,
                message: "Task to model review deleted successfully",
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
