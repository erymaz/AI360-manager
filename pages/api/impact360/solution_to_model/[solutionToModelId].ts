import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const solutionToModelSchema = Joi.object({
    model_id: Joi.string(),
    solution_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {solutionToModelId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            const existingData = await prisma.solution_to_model.findFirstOrThrow(
                {
                    where: {id: String(solutionToModelId)},
                }
            );
            const data = req.body;
            await solutionToModelSchema.validateAsync(data);
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

            const solution_to_model = await prisma.solution_to_model.update({
                where: {
                    id_solution_id_model_id: {
                        id: String(solutionToModelId),
                        model_id: String(existingData.model_id),
                        solution_id: String(existingData.solution_id),
                    },
                },
                data: req.body,
            });

            return res.status(201).json({solution_to_model});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const existingData = await prisma.solution_to_model.findFirstOrThrow(
                {
                    where: {id: String(solutionToModelId)},
                }
            );
            const solution_to_model = await prisma.solution_to_model.delete({
                where: {
                    id_solution_id_model_id: {
                        id: String(solutionToModelId),
                        model_id: String(existingData.model_id),
                        solution_id: String(existingData.solution_id),
                    },
                },
            });
            return res
                .status(200)
                .json({
                    solution_to_model,
                    message: "Solution to model deleted successfully",
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
