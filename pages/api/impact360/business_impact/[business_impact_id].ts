import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";

const businessImpactSchema = Joi.object({
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
  estimated_value: Joi.string().allow('').allow(null),
  strategic_value: Joi.string().allow('').allow(null),

});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { business_impact_id } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.business_impact.findFirstOrThrow({
        where: { id: String(business_impact_id) },
      });
      const data = req.body;
      await businessImpactSchema.validateAsync(data);
      const business_impact =
        await prisma.business_impact.update({
          where: { id: String(business_impact_id) },
          data: req.body,
        });

      return res.status(201).json({ business_impact });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.business_impact.findFirstOrThrow({
        where: { id: String(business_impact_id) },
      });
      const business_impact_value =
        await prisma.business_impact.delete({
          where: { id: String(business_impact_id) },
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
