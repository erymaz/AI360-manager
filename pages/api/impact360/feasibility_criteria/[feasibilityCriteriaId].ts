import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const feasibility_criteria_schema = Joi.object({
    name: Joi.string(),
    weight_multiplicative: Joi.number(),
    organization_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {feasibilityCriteriaId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.feasibility_criteria.findFirstOrThrow({
                where: {id: String(feasibilityCriteriaId)},
            });
            const data = req.body;
            await feasibility_criteria_schema.validateAsync(data);
            if (req.body.organization_id) {
                await prisma.organizations.findFirstOrThrow({
                    where: {id: req.body.organization_id},
                });
            }
            const feasibility_criteria = await prisma.feasibility_criteria.update({
                where: {id: String(feasibilityCriteriaId)},
                data: req.body,
            });

            return res.status(201).json({feasibility_criteria});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.feasibility_criteria.findFirstOrThrow({
                where: {id: String(feasibilityCriteriaId)},
            });
            const organization = await prisma.feasibility_criteria.delete({
                where: {id: String(feasibilityCriteriaId)},
            });
            return res
                .status(200)
                .json({
                    organization,
                    message: "Feasibility criteria deleted successfully",
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
