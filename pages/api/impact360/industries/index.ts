import prisma, { getNewUUID } from "@/lib/prisma";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const industrieSchema = Joi.object({
  name: Joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let industries: any = [];
      if (req.query.id) {
        const industry = await prisma.industries.findFirst({
          where: {
            id: String(req.query.id),
          },
        });

        return res.status(200).json(industry);
      }

      const { organization_id } = req.query;

      if (organization_id) {
        const organization = await prisma.organizations.findFirstOrThrow({
          where: {
            id: String(organization_id),
          }
        });

        if (!organization.is_superadmin && !organization.is_supervisor) {
          let baseQuery = `select 
            idu.created_at as created_at,
            idu.id as id,
            idu.name as name
            FROM classifications cf 
            left join industries idu on idu.id=cf.industry_id 
            where cf.organization_id='${organization_id}'
            group by idu.id
            order by idu.name asc;
          `;
          industries = await prisma.$queryRawUnsafe(baseQuery);
        } else {
          industries = await prisma.industries.findMany({
            orderBy: {
              name: 'asc',
            }
          });
        }
      } else {
        industries = await prisma.industries.findMany({
          orderBy: {
            name: 'asc',
          }
        });
      }

      return res.status(200).json({ industries });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await industrieSchema.validateAsync(data);
      const industry = await prisma.industries.create({
        data: {
          id: getNewUUID(),
          name: req.body.name,
          created_at: new Date().toISOString(),
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
