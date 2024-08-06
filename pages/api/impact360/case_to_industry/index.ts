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
            let cases_to_industry = [];
            if (req.query.id) {
                const cases_to_industry_byid = await prisma.cases_to_industry.findFirst(
                    {
                        where: {
                            id: String(req.query.id),
                        },
                    }
                );

                return res.status(200).json({cases_to_industry_byid});
            } else if (req.query) {
                const {skip, limit, case_id} = req.query;

                let details: any = {where: {AND: []}};

                if (case_id) {
                    details["where"]["case_id"] = String(case_id);
                }

                if (limit && skip) {
                    details["limit"] = Number(limit);
                    details["skip"] = Number(skip);
                }

                cases_to_industry = await prisma.cases_to_industry.findMany(details);
            } else {
                cases_to_industry = await prisma.cases_to_industry.findMany();
            }
            return res.status(200).json({cases_to_industry});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const {cases_to_industry} = req.body;
            if (cases_to_industry && cases_to_industry.length > 0) {
                const ArrayInit = [];
                for (let i = 0; i < cases_to_industry.length; i++) {
                    const details = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        ...cases_to_industry[i],
                    };
                    ArrayInit.push(details);
                }

                const cases_to_industry_data =
                    await prisma.cases_to_industry.createMany({
                        data: ArrayInit,
                    });
                return res.status(201).json({cases_to_industry_data});
            } else {
                return res.status(500).json({error: "cases to industry is required"});
            }
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
