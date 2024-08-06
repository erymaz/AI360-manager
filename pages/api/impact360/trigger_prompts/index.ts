import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const triggerPromptSchema = Joi.object({
  content: Joi.string().required(),
  ai_machine_id: Joi.string().required(),
  model: Joi.string().required(),
  role: Joi.string().required(),
  is_back_up: Joi.boolean(),
  max_tokens: Joi.number(),
  temperature: Joi.number(),
  top_p: Joi.number(),
  return_citations: Joi.boolean(),
  top_k: Joi.number(),
  presence_penalty: Joi.number(),
  frequency_penalty: Joi.number(),
  return_images: Joi.boolean(),
  stream: Joi.boolean(),
  is_used_for_industry_categories: Joi.boolean(),
  is_used_for_business_areas: Joi.boolean(),
  is_used_for_use_cases: Joi.boolean(),
  is_used_for_business_tasks: Joi.boolean(),
  is_used_for_use_cases_kpis_impact: Joi.boolean(),
  is_used_for_time_to_impact: Joi.boolean(),
  is_used_for_ai_tools: Joi.boolean(),
  is_used_for_ai_models: Joi.boolean(),
  is_used_for_customer_profiling: Joi.boolean(),
  is_used_for_alchemist_antiduplication: Joi.boolean(),
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
      let triggerPrompts = [];
      if (req.query) {
        const {skip, limit, id} = req.query;
        const details: any = {where: {}};

        if (id) {
          details["where"]["id"] = String(req.query["id"]);
        } else {
          if (skip && limit) {
            details["skip"] = Number(skip);
            details["limit"] = Number(limit);
          }
        }

        triggerPrompts = await prisma.trigger_prompts.findMany(
          details
        );
      } else {
        triggerPrompts = await prisma.trigger_prompts.findMany();
      }
      return res.status(200).json(triggerPrompts);
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await triggerPromptSchema.validateAsync(data);
      const triggerPrompt = await prisma.trigger_prompts.create({
        data: {
          id: getNewUUID(),
          created_at: new Date().toISOString(),
          ...data,
        },
      });
      return res.status(201).json(triggerPrompt);
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
