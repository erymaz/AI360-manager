import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const solutionToIndustrySchema = Joi.object({
    industry_id: Joi.string(),
    solution_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {solutionToIndustryId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            const existingData = await prisma.solution_to_industries.findFirstOrThrow(
                {
                    where: {id: String(solutionToIndustryId)},
                }
            );
            const data = req.body;
            await solutionToIndustrySchema.validateAsync(data);
            if (req.body.solution_id) {
                await prisma.solutions.findFirstOrThrow({
                    where: {id: req.body.solution_id},
                });
            }
            if (req.body.industry_id) {
                await prisma.industries.findFirstOrThrow({
                    where: {id: req.body.industry_id},
                });
            }

            const solution_to_industry = await prisma.solution_to_industries.update({
                where: {
                    id_solution_id_industry_id: {
                        id: String(solutionToIndustryId),
                        industry_id: String(existingData.industry_id),
                        solution_id: String(existingData.solution_id),
                    },
                },
                data: req.body,
            });

            return res.status(201).json({solution_to_industry});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const existingData = await prisma.solution_to_industries.findFirstOrThrow(
                {
                    where: {id: String(solutionToIndustryId)},
                }
            );
            const solution_to_industry = await prisma.solution_to_industries.delete({
                where: {
                    id_solution_id_industry_id: {
                        id: String(solutionToIndustryId),
                        industry_id: String(existingData.industry_id),
                        solution_id: String(existingData.solution_id),
                    },
                },
            });
            return res
                .status(200)
                .json({
                    solution_to_industry,
                    message: "Solution to industry deleted successfully",
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
