import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryMetricValueSchema = Joi.object({
    baseline_value: Joi.string(),
    task_to_metric_id: Joi.string(),
    entry_business_impact_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {business_impact_baseline_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.business_impact_baseline.findFirstOrThrow({
                where: {id: String(business_impact_baseline_id)},
            });
            const data = req.body;
            await entryMetricValueSchema.validateAsync(data);
            if (req.body.task_to_metric_id) {
                await prisma.metrics.findFirstOrThrow({
                    where: {id: req.body.task_to_metric_id},
                });
            }
            const business_impact_value =
                await prisma.business_impact_baseline.update({
                    where: {id: String(business_impact_baseline_id)},
                    data: req.body,
                });

            return res.status(201).json({business_impact_value});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.business_impact_baseline.findFirstOrThrow({
                where: {id: String(business_impact_baseline_id)},
            });
            const business_impact_value =
                await prisma.business_impact_baseline.delete({
                    where: {id: String(business_impact_baseline_id)},
                });
            return res.status(200).json({
                business_impact_value,
                message: "Business imapact value deleted successfully",
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
