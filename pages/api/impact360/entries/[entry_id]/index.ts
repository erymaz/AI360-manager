import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const entrySchema = Joi.object({
  name: Joi.string().allow(null).allow(""),
  business_area_id: Joi.string().allow(null).allow(""),
  opportunity_id: Joi.string().allow(null).allow(""),
  case_id: Joi.string(),
  task_id: Joi.string(),
  locale_id: Joi.string().allow(null).allow(""),
  winner_solution_id: Joi.string().allow(null).allow(""),
  winner_solution_is_custom: Joi.boolean().default(false),
  model_id: Joi.string().allow(null).allow(""),
  report_id: Joi.string().allow(null).allow(""),
  department_id: Joi.string().allow(null).allow(""),
  objective_id: Joi.string().allow(null).allow(""),
  status_id: Joi.string().allow(null).allow(""),
  author_id: Joi.string().allow(null).allow(""),
  business_impact: Joi.number().allow(null).allow(""),
  feasibility_number: Joi.number().allow(null).allow(""),
  is_draft: Joi.boolean(),
  use_case_key: Joi.string().allow(null).allow(""),
  task_key: Joi.string().allow(null).allow(""),
  creator_organization_id: Joi.string(),
  time_to_impact: Joi.string().allow(null).allow(""),
  assessment: Joi.string().allow(null).allow(""),
  goal: Joi.string().allow(null).allow(""),
  planned: Joi.string().allow(null).allow(""),
  industry_id: Joi.string().allow(null).allow(""),
  industry_category_id: Joi.string().allow(null).allow(""),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entry_id } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.entries.findFirstOrThrow({
        where: { id: String(entry_id) },
      });
      const data = req.body;
      await entrySchema.validateAsync(data);

      if (req.body.case_id) {
        await prisma.cases.findFirstOrThrow({
          where: { id: req.body.case_id },
        });
      }
      if (req.body.task_id) {
        await prisma.tasks.findFirstOrThrow({
          where: { id: req.body.task_id },
        });
      }

      if (req.body.department_id) {
        await prisma.departments.findFirstOrThrow({
          where: { id: req.body.department_id },
        });
      }
      if (req.body.status_id) {
        await prisma.statuses.findFirstOrThrow({
          where: { id: req.body.status_id },
        });
      }
      if (req.body.creator_organization_id) {
        await prisma.organizations.findFirst({
          where: { id: req.body.creator_organization_id },
        });
      }
      if (req.body.locale_id) {
        await prisma.locale.findFirstOrThrow({
          where: { id: req.body.locale_id },
        });
      }

      const entry = await prisma.entries.update({
        where: { id: String(entry_id) },
        data: req.body,
      });

      return res.status(201).json({ entry });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const entry = await prisma.entries.findFirstOrThrow({
        where: { id: String(entry_id) },
      });
      if (entry.report_id === 'ef790c29-65ac-4e7c-b486-6d2524c0d430' || entry.report_id === 'bf188ed5-00b9-425b-a0bf-5e55e82c575b') {
        return res.status(400).end(`Can't delete entries in key report`);
      }
      const deleteArray = [];
      deleteArray.push(
        prisma.entry_to_objectives.deleteMany({
          where: {
            entry_id: String(req.query.entry_id),
          },
        })
      );

      deleteArray.push(
        prisma.entry_to_initiatives.deleteMany({
          where: {
            entry_id: String(req.query.entry_id),
          },
        })
      );

      deleteArray.push(
        prisma.business_impact.deleteMany({
          where: {
            entry_id: String(entry_id),
          },
        })
      );

      // deleteArray.push(
      //   prisma.task_to_solution.deleteMany({
      //     where: {
      //       entry_id: String(req.query.entry_id),
      //     },
      //   })
      // );

      // deleteArray.push(
      //   prisma.task_to_solution_reviews.deleteMany({
      //     where: {
      //       entry_id: String(req.query.entry_id),
      //     },
      //   })
      // );

      deleteArray.push(
        prisma.entries.delete({
          where: { id: String(entry_id) },
        })
      );

      await Promise.all(deleteArray);

      return res.status(200).json({ message: "Entry deleted successfully" });
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
