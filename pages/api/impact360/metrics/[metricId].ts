import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const metricSchema = Joi.object({
    name: Joi.string(),
    is_business_impact: Joi.boolean(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {metricId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.metrics.findFirstOrThrow({
                where: {id: String(metricId)},
            });
            const data = req.body;
            await metricSchema.validateAsync(data);

            const metric = await prisma.metrics.update({
                where: {id: String(metricId)},
                data: req.body,
            });

            return res.status(201).json({metric});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.metrics.findFirstOrThrow({
                where: {id: String(metricId)},
            });
            const metric = await prisma.metrics.delete({
                where: {id: String(metricId)},
            });
            return res
                .status(200)
                .json({metric, message: "Matric deleted successfully"});
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
