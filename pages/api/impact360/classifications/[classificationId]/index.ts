import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const classificationSchema = Joi.object({
  organization_id: Joi.string().required(),
  industry_id: Joi.string().allow("", null), //blank for all
  industry_category_id: Joi.string().allow("", null), //it will be required
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { classificationId } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.classifications.findFirstOrThrow({
        where: { id: String(classificationId) },
      });

      const data = req.body;
      await classificationSchema.validateAsync(data);

      await prisma.organizations.findFirstOrThrow({
        where: { id: data?.organization_id },
      });

      if (data?.industry_id) {
        await prisma.industries.findFirstOrThrow({
          where: { id: data?.industry_id },
        });
      }

      if (data?.industry_id && data?.industry_category_id) {
        await prisma.industry_categories.findFirstOrThrow({
          where: {
            id: data?.industry_category_id,
            industry_id: data?.industry_id,
          },
        });
      } else if (data?.industry_category_id) {
        await prisma.industry_categories.findFirstOrThrow({
          where: {
            id: data?.industry_category_id,
          },
        });
      }

      const classification = await prisma.classifications.update({
        where: { id: String(classificationId) },
        data: req.body,
      });

      return res.status(201).json({ classification });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.classifications.findFirstOrThrow({
        where: { id: String(classificationId) },
      });

      const classification = await prisma.classifications.delete({
        where: { id: String(classificationId) },
      });
      return res.status(200).json({
        classification,
        message: "Classification deleted successfully",
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
