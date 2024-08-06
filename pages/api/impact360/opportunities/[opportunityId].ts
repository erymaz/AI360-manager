import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const opportunitySchema = Joi.object({
    name: Joi.string(),
    country_id: Joi.string().allow(null).allow(""),
    region_id: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {opportunityId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.opportunities.findFirstOrThrow({
                where: {id: String(opportunityId)},
            });
            const data = req.body;
            await opportunitySchema.validateAsync(data);
            const updatedOpportunity = await prisma.opportunities.update({
                where: {id: String(opportunityId)},
                data: req.body,
            });

            return res.status(201).json({opportunity: updatedOpportunity});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedOpportunity = await prisma.opportunities.delete({
                where: {id: String(opportunityId)},
            });
            return res
                .status(200)
                .json({opportunity: deletedOpportunity, message: "Opportunity deleted successfully"});
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
