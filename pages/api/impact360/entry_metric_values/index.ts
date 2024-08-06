import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const entryMetricValueSchema = Joi.object({
    entry_id: Joi.string().required(),
    value_difference: Joi.string().required(),
    type: Joi.string().required(),
    logic_comment: Joi.string().required(),
    is_not_quantifiable: Joi.boolean().required()
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let entry_metric_values = [];
            if (req.query.id) {
                entry_metric_values = await prisma.entry_metric_values.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query) {
                const {entry_id, skip, limit} = req.query;
                const details: any = {where: {}};

                if (skip && limit) {
                    details["skip"] = Number(skip);
                    details["limit"] = Number(limit);
                }

                if (entry_id) {
                    details["where"]["filial_id"] = String(entry_id);
                }

                entry_metric_values = await prisma.entry_metric_values.findMany(
                    details
                );
            } else {
                entry_metric_values = await prisma.entry_metric_values.findMany();
            }

            return res.status(200).json({entry_metric_values});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await entryMetricValueSchema.validateAsync(data);
            await prisma.entries.findFirstOrThrow({
                where: {id: req.body.entry_id},
            });
            const entry_metric_value = await prisma.entry_metric_values.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({entry_metric_value});
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
