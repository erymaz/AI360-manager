import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryMetricValueSchema = Joi.object({
    entry_id: Joi.string(),
    after_ai_value: Joi.string(),
    value_difference: Joi.string(),
    type: Joi.string(),
    logic_comment: Joi.string(),
    is_not_quantifiable: Joi.boolean(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {entry_metric_value_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.entry_metric_values.findFirstOrThrow({
                where: {id: String(entry_metric_value_id)},
            });

            const data = req.body;
            await entryMetricValueSchema.validateAsync(data);

            if (req.body.entry_id) {
                await prisma.entries.findFirstOrThrow({
                    where: {id: req.body.entry_id},
                });
            }

            const entry_metric_value = await prisma.entry_metric_values.update({
                where: {id: String(entry_metric_value_id)},
                data: req.body,
            });

            return res.status(201).json({entry_metric_value});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.entry_metric_values.findFirstOrThrow({
                where: {id: String(entry_metric_value_id)},
            });

            const entry_metric_value = await prisma.entry_metric_values.delete({
                where: {id: String(entry_metric_value_id)},
            });

            return res.status(200).json({
                entry_metric_value,
                message: "Entry metric value deleted successfully",
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
