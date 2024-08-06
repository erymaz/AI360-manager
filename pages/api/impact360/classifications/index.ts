import prisma, { getNewUUID } from "@/lib/prisma";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const classificationSchema = Joi.object({
  organization_id: Joi.string().required(),
  industry_id: Joi.string().allow("", null), //blank for all
  industry_category_id: Joi.string().allow("", null), //it will be required
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let classifications = [];
      if (req.query.id) {
        const industries = await prisma.classifications.findFirst({
          where: {
            id: String(req.query.id),
          },
        });

        return res.status(200).json(industries);
      } else if (req.query) {
        const {
          skip,
          limit,
          organization_id,
          industry_id,
          industry_category_id,
        } = req.query;

        let details: any = { where: { AND: [] } };

        if (organization_id) {
          details["where"]["organization_id"] = String(organization_id);
        }

        if (industry_id) {
          details["where"]["industry_id"] = String(industry_id);
        }

        if (industry_category_id) {
          details["where"]["industry_category_id"] =
            String(industry_category_id);
        }

        if (limit && skip) {
          details["limit"] = Number(limit);
          details["skip"] = Number(skip);
        }

        classifications = await prisma.classifications.findMany(details);
      } else {
        classifications = await prisma.classifications.findMany();
      }
      return res.status(200).json({ classifications });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
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

      const existingClassification = await prisma.classifications.findFirst({
        where: data,
      });

      if (existingClassification) {
        return res.status(409).json({ error: "Classification already exists" });
      }

      const industry = await prisma.classifications.create({
        data: {
          id: getNewUUID(),
          created_at: new Date().toISOString(),
          ...data,
        },
      });
      return res.status(200).json({ industry });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
