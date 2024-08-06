import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const objectiveSchema = Joi.object({
    name: Joi.string(),
    business_impact: Joi.string(),
    start_time: Joi.date(),
    end_time: Joi.date(),
    period: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {organizationId, objectiveId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: String(objectiveId)},
            });
            const data = req.body;
            await objectiveSchema.validateAsync(data);
            if (req.body.start_time) {
                req.body.start_time = new Date(req.body.start_time).toISOString();
            }
            if (req.body.end_time) {
                req.body.end_time = new Date(req.body.end_time).toISOString();
            }

            const objective = await prisma.organization_objectives.update({
                where: {id: String(objectiveId)},
                data: req.body,
            });

            return res.status(201).json({objective});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: String(objectiveId)},
            });
            const objective = await prisma.organization_objectives.delete({
                where: {id: String(objectiveId)},
            });
            return res
                .status(200)
                .json({objective, message: "Objective deleted successfully"});
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
