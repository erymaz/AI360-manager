import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect, AuthData} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";


const reviewSchema = Joi.object({
    solution_id: Joi.string().required(),
    feasibility_criteria_id: Joi.string().required(),
    score: Joi.number().required(),
    comment: Joi.string().required(),
    reviewer_organization_id: Joi.string().required(),
    model_id: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    authData: AuthData
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let reviews = [];
            if (req.query.id) {
                reviews = await prisma.reviews.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.solution_id) {
                reviews = await prisma.reviews.findMany({
                    where: {
                        solution_id: String(req.query.solution_id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                reviews = await prisma.reviews.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                reviews = await prisma.reviews.findMany();
            }
            return res.status(200).json({reviews});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await reviewSchema.validateAsync(data);
            await prisma.solutions.findFirstOrThrow({
                where: {id: req.body.solution_id},
            });
            await prisma.models.findFirstOrThrow({
                where: {id: req.body.model_id},
            });
            await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.reviewer_organization_id},
            });
            await prisma.feasibility_criteria.findFirstOrThrow({
                where: {id: req.body.feasibility_criteria_id},
            });
            const review = await prisma.reviews.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    author_id: authData.clerkUserId,
                    ...data,
                },
            });
            return res.status(201).json({review});
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
