import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const solutionToIndustrySchema = Joi.object({
    industry_id: Joi.string().required(),
    solution_id: Joi.string().required(),
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
            let solution_to_industries = [];
            if (req.query.id) {
                solution_to_industries = await prisma.solution_to_industries.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                solution_to_industries = await prisma.solution_to_industries.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                solution_to_industries = await prisma.solution_to_industries.findMany();
            }
            return res.status(200).json({solution_to_industries});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await solutionToIndustrySchema.validateAsync(data);
            await prisma.industries.findFirstOrThrow({
                where: {id: req.body.industry_id},
            });
            await prisma.solutions.findFirstOrThrow({
                where: {id: req.body.solution_id},
            });
            const solution_to_industry = await prisma.solution_to_industries.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({solution_to_industry});
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