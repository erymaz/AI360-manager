import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToSolutionSchema = Joi.object({
    task_id: Joi.string().required(),
    solution_id: Joi.string().required(),
    suggested: Joi.boolean().required(),
    needs_allocation: Joi.boolean().required(),
    impact_starts: Joi.string().required(),
    entry_id: Joi.string().required(),
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
            let task_to_solutions = [];
            if (req.query.id) {
                task_to_solutions = await prisma.task_to_solution.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                task_to_solutions = await prisma.task_to_solution.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                task_to_solutions = await prisma.task_to_solution.findMany();
            }
            return res.status(200).json({task_to_solutions});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await taskToSolutionSchema.validateAsync(data);
            await prisma.tasks.findFirstOrThrow({
                where: {id: req.body.task_id},
            });
            await prisma.solutions.findFirstOrThrow({
                where: {id: req.body.solution_id},
            });
            const task_to_solution = await prisma.task_to_solution.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({task_to_solution});
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
