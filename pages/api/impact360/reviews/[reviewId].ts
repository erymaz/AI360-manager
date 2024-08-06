import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const reviewSchema = Joi.object({
    solution_id: Joi.string(),
    feasibility_criteria_id: Joi.string(),
    score: Joi.number(),
    comment: Joi.string(),
    reviewer_organization_id: Joi.string(),
    model_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {reviewId} = req.query;
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.reviews.findFirstOrThrow({
                where: {id: String(reviewId)},
            });
            const data = req.body;
            await reviewSchema.validateAsync(data);
            if (req.body.solution_id) {
                await prisma.solutions.findFirstOrThrow({
                    where: {id: req.body.solution_id},
                });
            }
            if (req.body.model_id) {
                await prisma.models.findFirstOrThrow({
                    where: {id: req.body.model_id},
                });
            }
            if (req.body.feasibility_criteria_id) {
                await prisma.feasibility_criteria.findFirstOrThrow({
                    where: {id: req.body.feasibility_criteria_id},
                });
            }
            if (req.body.reviewer_organization_id) {
                await prisma.organizations.findFirstOrThrow({
                    where: {id: req.body.reviewer_organization_id},
                });
            }

            const review = await prisma.reviews.update({
                where: {id: String(reviewId)},
                data: req.body,
            });

            return res.status(201).json({review});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.reviews.findFirstOrThrow({
                where: {id: String(reviewId)},
            });
            const review = await prisma.reviews.delete({
                where: {id: String(reviewId)},
            });
            return res
                .status(200)
                .json({review, message: "Review deleted successfully"});
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
