import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToSolutionReviewSchema = Joi.object({
    // task_to_solution_id: Joi.string().required(),
    // feasibility_criteria_id: Joi.string().required(),
    // reviewer_organization_id: Joi.string().required(),
    // entry_id: Joi.string().allow(null).allow(""),
    // score: Joi.number().required(),
    // comment: Joi.string().required(),
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
            let task_to_solution_reviews = [];
            if (req.query.id) {
                task_to_solution_reviews =
                    await prisma.task_to_solution_reviews.findMany({
                        where: {
                            id: String(req.query.id),
                        },
                    });
            } else if (req.query.limit && req.query.skip) {
                task_to_solution_reviews =
                    await prisma.task_to_solution_reviews.findMany({
                        skip: Number(req.query.skip),
                        take: Number(req.query.limit),
                    });
            } else {
                task_to_solution_reviews =
                    await prisma.task_to_solution_reviews.findMany();
            }
            return res.status(200).json({task_to_solution_reviews});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const {fecibility_criteria_ids} = req.body;

            if (fecibility_criteria_ids && fecibility_criteria_ids.length > 0) {
                const fecibility_criteria_array: any = [];
                for (let i = 0; i < fecibility_criteria_ids.length; i++) {
                    const data = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        ...fecibility_criteria_ids[i],
                    };
                    fecibility_criteria_array.push(data);
                }

                const task_to_solution_review =
                    await prisma.task_to_solution_reviews.createMany({
                        data: fecibility_criteria_array,
                    });
                return res.status(201).json({task_to_solution_review});
            }
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        try {
            const {fecibility_criteria_ids} = req.body;
            if (fecibility_criteria_ids) {
                const transect_arr = [];
                for (let i = 0; i < fecibility_criteria_ids.length; i++) {
                    const {id, ...data} = fecibility_criteria_ids[i];
                    transect_arr.push(
                        prisma.task_to_solution_reviews.update({
                            where: {id: String(id)},
                            data: data,
                        })
                    );
                }
                const business_impact_value = await prisma.$transaction(transect_arr);
                return res.status(201).json(business_impact_value);
            }
        } catch (error) {
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
