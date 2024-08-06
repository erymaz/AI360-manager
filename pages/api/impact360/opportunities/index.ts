import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getWaipifyMasterUserID } from "@/lib/services/userdetails";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const opportunitySchema = Joi.object({
  name: Joi.string().required(),
  business_area_id: Joi.string().required(),
  organization_creator_id: Joi.string().required(),
  country_id: Joi.string().allow(null).allow(""),
  region_id: Joi.string().allow(null).allow(""),
  description: Joi.string().allow(null).allow(""),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let opportunities: any = [];

      if (req.query) {
        const { id, skip, limit, name, organization_creator_id, business_area_id } =
          req.query;

        let baseQuery = `select 
            op.id as id,
            op.name as name,
            op.created_at as created_at,
            op.country_id as country_id,
            op.region_id as region_id,
            op.organization_creator_id as organization_creator_id,
            op.description as description
            FROM business_areas_to_opportunity bat 
            left join opportunities op on op.id COLLATE utf8mb4_unicode_ci=bat.opportunity_id 
            where true=true`;

        const masterUserId = await getWaipifyMasterUserID();

        if (organization_creator_id) {
          baseQuery += ` and (op.organization_creator_id='${organization_creator_id}' or op.organization_creator_id='${masterUserId}')`;
        }

        if (business_area_id) {
          baseQuery += ` and bat.business_area_id='${business_area_id}'`;
        }

        if(name){
          baseQuery += ` and op.name like '%${name}%'`;
        }

        baseQuery += ` group by bat.id, op.id order by op.name asc;`;

        opportunities = await prisma.$queryRawUnsafe(baseQuery);
      } else {
        opportunities = await prisma.opportunities.findMany();
      }
      return res.status(200).json({ opportunities });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await opportunitySchema.validateAsync(data);
      const {
        organization_creator_id,
        business_area_id,
        industry_id,
        ...opportunityData
      } = data;

      const currentOpportunity = await prisma.opportunities.findFirst({
        where: {
          organization_creator_id,
          name: opportunityData.name,
        },
      });

      if (currentOpportunity) {
        return res.status(409).json({ error: "Opportunity already exists" });
      } else {
        const id = getNewUUID();
        const newOpportunity = await prisma.opportunities.create({
          data: {
            id,
            organization_creator_id,
            ...opportunityData,
          },
        });

        if (newOpportunity) {
          await prisma.business_areas_to_opportunity.create({
            data: {
              id: getNewUUID(),
              business_area_id,
              opportunity_id: newOpportunity?.id,
            },
          });
        }
        return res.status(200).json({ opportunity: newOpportunity });
      }
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
