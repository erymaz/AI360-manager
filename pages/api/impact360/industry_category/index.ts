import prisma, { getNewUUID } from "@/lib/prisma";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  source_id: Joi.string().allow("", null),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { industry_id } = req.query;

      let industry_categories: any = [];
      let baseQuery = `select 
        idcu.id as id,
        idcu.name as name,
        idcu.created_at as created_at
        FROM industry_categories idcu`;

      if (industry_id) {
        baseQuery += ` where idcu.industry_id='${industry_id}'`;
      }

      baseQuery += ` order by idcu.name asc`;

      industry_categories = await prisma.$queryRawUnsafe(baseQuery);

      return res.status(200).json({ industry_categories });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await categorySchema.validateAsync(data);
      const category = await prisma.industry_categories.create({
        data: {
          id: getNewUUID(),
          created_at: new Date().toISOString(),
          ...data,
        },
      });
      return res.status(200).json({ category });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
