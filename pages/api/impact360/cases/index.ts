import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getWaipifyMasterUserID } from "@/lib/services/userdetails";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const caseSchema = Joi.object({
  name: Joi.string().required(),
  industry_id: Joi.string().allow(null).allow(""),
  country_id: Joi.string().allow(null).allow(""),
  region_id: Joi.string().allow(null).allow(""),
  description: Joi.string().allow(null).allow(""),
  original_id: Joi.string().allow(null).allow(""),
  organization_id: Joi.string().required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let cases = [];

      if (req.query) {
        const { skip, limit, organization_creator_id, industry_id, business_area_id, name, business_area_ids } = req.query;

        const masterUserId = await getWaipifyMasterUserID();
        const details: any = { where: { AND: [] } };

        let removeRecordQuery = `SELECT DISTINCT original_id
          FROM cases
          WHERE organization_creator_id="${organization_creator_id}" AND original_id IS NOT NULL${
          name ? ` AND name LIKE "%${name}%"` : ""
        }`;

        let removeRecordIds: any = await prisma.$queryRawUnsafe(
          removeRecordQuery
        );

        details["where"]["id"] = {
          notIn: removeRecordIds.map((rec: any) => rec.original_id),
        };

        if (organization_creator_id) {
          details["where"]["AND"].push({
            OR: [
              { organization_creator_id: organization_creator_id },
              { organization_creator_id: masterUserId },
            ],
          });
        }

        if (business_area_id) {
          details["where"]["business_area_id"] = String(business_area_id);
        } else if (business_area_ids) {
          const business_areas = JSON.parse(String(business_area_ids)) as string[];
          details["where"]["business_area_id"] = {
            in: business_areas
          };
        } else if (industry_id) {
          details["where"]["industry_id"] = String(industry_id);
        }

        if (name) {
          details["where"]["name"] = {
            contains: String(name),
          };
        }

        if (skip && limit) {
          details["skip"] = Number(skip);
          details["limit"] = Number(limit);
        }

        details["orderBy"] = [{ name: "asc" }];
        cases = await prisma.cases.findMany(details);
      } else {
        cases = await prisma.cases.findMany();
      }
      return res.status(200).json({ cases });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await caseSchema.validateAsync(data);
      const { organization_id, industry_id, ...caseData } = data;
      const organization = await prisma.organizations.findFirstOrThrow({
        where: {
          id: organization_id,
        },
      });
      if (industry_id) {
        await prisma.industries.findFirstOrThrow({
          where: {
            id: industry_id,
          },
        });
      }

      const currentcase = await prisma.cases.findFirst({
        where: {
          organization_creator_id: organization.creator_id,
          name: caseData.name,
        },
      });

      if (currentcase) {
        return res.status(409).json({ error: "Case already exists" });
      } else {
        const id = getNewUUID();
        const newCase = await prisma.cases.create({
          data: {
            id,
            industry_id: industry_id ?? null,
            organization_creator_id: organization.creator_id,
            created_at: new Date().toISOString(),
            ...caseData,
          },
        });
        return res.status(200).json({ case: newCase });
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
