import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const organizationSchema = Joi.object({
    name: Joi.string(),
    business_impact: Joi.string(),
    start_time: Joi.date(),
    end_time: Joi.date(),
    period: Joi.string(),
    objective_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {initiativeId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.initiatives.findFirstOrThrow({
                where: {id: String(initiativeId)},
            });
            const data = req.body;
            await organizationSchema.validateAsync(data);
            if (req.body.objective_id) {
                await prisma.organization_objectives.findFirstOrThrow({
                    where: {id: req.body.objective_id},
                });
            }
            if (req.body.start_time) {
                req.body.start_time = new Date(req.body.start_time).toISOString();
            }
            if (req.body.end_time) {
                req.body.end_time = new Date(req.body.end_time).toISOString();
            }

            const initiative = await prisma.initiatives.update({
                where: {id: String(initiativeId)},
                data: req.body,
            });

            return res.status(201).json({initiative});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.initiatives.findFirstOrThrow({
                where: {id: String(initiativeId)},
            });
            const initiative = await prisma.initiatives.delete({
                where: {id: String(initiativeId)},
            });
            return res
                .status(200)
                .json({initiative, message: "Initiative deleted successfully"});
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
