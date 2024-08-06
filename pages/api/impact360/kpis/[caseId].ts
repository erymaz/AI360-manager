import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const caseSchema = Joi.object({
    name: Joi.string(),
    industry_id: Joi.string().allow(null).allow(""),
    country_id: Joi.string().allow(null).allow(""),
    region_id: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {caseId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            const {caseId} = req.query;
            let baseQuery = `SELECT cs.id, cs.name, cs.country_id, cs.region_id, cs.description, cs.organization_creator_id,  
      JSON_ARRAYAGG(JSON_OBJECT('id', ma.id,'industry_id', ma.industry_id, 'name', ind.name )) as industries
      FROM cases cs
      LEFT JOIN cases_to_industry ma ON ma.case_id COLLATE utf8mb4_unicode_ci = cs.id 
      LEFT JOIN industries ind ON ind.id COLLATE utf8mb4_unicode_ci = ma.industry_id 
      where cs.id="${caseId}" GROUP BY cs.id`;

            let updatedCase: any = await prisma.$queryRawUnsafe(baseQuery);

            if (updatedCase.length) {
                const industries = updatedCase[0].industries;
                updatedCase = {
                    ...updatedCase[0],
                    industries: industries.filter(
                        (ind: { id: string; industry_id: string }) =>
                            ind.id && ind.industry_id
                    ),
                };
            }

            return res.status(201).json(updatedCase);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        try {
            await prisma.cases.findFirstOrThrow({
                where: {id: String(caseId)},
            });
            const data = req.body;
            await caseSchema.validateAsync(data);
            if (req.body.industry_id) {
                await prisma.industries.findFirstOrThrow({
                    where: {id: req.body.industry_id},
                });
            }
            if (req.body.industry_id) {
                await prisma.locale.findFirstOrThrow({
                    where: {id: req.body.industry_id},
                });
            }

            const updatedCase = await prisma.cases.update({
                where: {id: String(caseId)},
                data: req.body,
            });

            return res.status(201).json({case: updatedCase});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.cases.findFirstOrThrow({
                where: {id: String(caseId)},
            });
            const deletedCase = await prisma.cases.delete({
                where: {id: String(caseId)},
            });
            return res
                .status(200)
                .json({case: deletedCase, message: "Case deleted successfully"});
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
