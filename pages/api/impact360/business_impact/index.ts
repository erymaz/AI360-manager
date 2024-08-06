import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const businessImpactSchema = Joi.object({
  entry_id: Joi.string().required(),
  repeats_yearly: Joi.string().allow('').allow(null),
  time_per_outcomes: Joi.string().allow('').allow(null),
  time_per_outcomes_after_ai: Joi.string().allow('').allow(null),
  reduced_process_time_from: Joi.string().allow('').allow(null),
  reduced_process_time_to: Joi.string().allow('').allow(null),
  employee_hourly_rate: Joi.string().allow('').allow(null),
  total_cost_yearly: Joi.string().allow('').allow(null),
  total_cost_yearly_after_ai: Joi.string().allow('').allow(null),
  can_perform_other_tasks: Joi.boolean(),
  has_high_replacement_cost: Joi.boolean(),
  has_direct_impact: Joi.boolean(),
  open_new_revenue_stream: Joi.boolean(),
  revenue_increase_with_ai: Joi.string().allow('').allow(null),
  comments: Joi.string().allow('').allow(null),
  is_not_quantifiable: Joi.boolean(),
  estimated_value: Joi.number().required(),
  strategic_value: Joi.string().allow('').allow(null),
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
            let businessImpacts = [];
            if (req.query) {
                const {skip, limit, id, entry_id} = req.query;
                const details: any = {where: {}};

                if (id) {
                    details["where"]["id"] = String(req.query["id"]);
                } else {
                    if (entry_id) {
                        details["where"]["entry_id"] = String(
                            req.query["entry_id"]
                        );
                    }

                    if (skip && limit) {
                        details["skip"] = Number(skip);
                        details["limit"] = Number(limit);
                    }
                }

                businessImpacts = await prisma.business_impact.findMany(
                    details
                );
            } else {
                businessImpacts = await prisma.business_impact.findMany();
            }
            return res.status(200).json(businessImpacts);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await businessImpactSchema.validateAsync(data);
            await prisma.entries.findFirstOrThrow({
                where: {id: data.entry_id},
            });
            const business_impact = await prisma.business_impact.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...data,
                },
            });
            return res.status(201).json({business_impact});
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
