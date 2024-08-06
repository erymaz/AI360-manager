import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  source_id: Joi.string().allow("", null),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { industryCategoryId } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.industry_categories.findFirstOrThrow({
        where: { id: String(industryCategoryId) },
      });
      const data = req.body;
      await categorySchema.validateAsync(data);

      const updatedIndustryCategory = await prisma.industry_categories.update({
        where: { id: String(industryCategoryId) },
        data: req.body,
      });

      return res
        .status(201)
        .json({ industry_category: updatedIndustryCategory });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedIndustryCategory = await prisma.industry_categories.delete({
        where: { id: String(industryCategoryId) },
      });
      return res.status(200).json({
        opportunity: deletedIndustryCategory,
        message: "Industry category deleted successfully",
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
