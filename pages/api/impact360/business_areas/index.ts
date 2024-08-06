import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let businessAreas: any = [];
      if (req.query) {
        const { industry_id, industry_category_id, organization_id } = req.query;
        let organization = null;
        if (organization_id) {
          organization = await prisma.organizations.findFirstOrThrow({
            where: {
              id: String(organization_id),
            },
          });
        }

        let baseQuery = `select 
          ba.id as id,
          ba.name as name,
          ba.created_at as created_at
          FROM business_areas ba`;

        if (organization_id && organization) {
          // Get business areas for organization industries
          const classifications = await prisma.classifications.findMany({
            where: {
              organization_id: String(organization_id),
            },
          });
          let industries = '';
          if (classifications.length) {
            industries = classifications.map(classification => classification.industry_id).join("','");
          } else {
            industries = String(organization.industry_id);
          }
          baseQuery += ` WHERE ba.industry_id in ('${industries}') OR ba.industry_id IS NULL ORDER BY ba.name ASC`;
        } else {
          if (industry_id && industry_category_id) {
            baseQuery += ` where ba.industry_id = '${industry_id}' and (ba.industry_category_id = '${industry_category_id}' or ba.industry_category_id IS NULL)`;
          } else if (industry_id) {
            baseQuery += ` where ba.industry_id = '${industry_id}' or ba.industry_id IS NULL`;
          } else {
            baseQuery += ` where ba.industry_id IS NULL`;
          }
          baseQuery += ` order by ba.name asc`;
        }

        businessAreas = await prisma.$queryRawUnsafe(baseQuery);
      } else {
        businessAreas = await prisma.business_areas.findMany({
          orderBy: {
            name: 'asc',
          }
        });
      }
      return res.status(200).json({ businessAreas });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
