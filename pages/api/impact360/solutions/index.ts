import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getWaipifyMasterUserID } from "@/lib/services/userdetails";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const solutionSchema = Joi.object({
  name: Joi.string().required(),
  provider_id: Joi.string().allow(null).allow(""),
  description: Joi.string().allow(null).allow(""),
  organization_id: Joi.string().required(),
  model_id: Joi.string().allow(null).allow(""),
  has_api: Joi.boolean().allow(null).allow(""),
  has_user_friendly_ui: Joi.boolean().allow(null).allow(""),
  documentation_url: Joi.string().optional,
  features: Joi.string().optional,
  benefits: Joi.string().optional,
  has_grpc: Joi.boolean().allow(null).allow(""),
  has_extension: Joi.boolean().allow(null).allow(""),
  is_platform: Joi.boolean().allow(null).allow(""),
  is_available: Joi.boolean().allow(null).allow(""),
  has_incumbent_integration: Joi.boolean().allow(null).allow(""),
  version: Joi.string().allow(null).allow(""),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let baseQuery = `select 
        so.id,
        so.name,
        so.provider_id,
        so.description,
        so.created_at,
        so.organization_creator_id,
        so.documentation_url,
        so.features,
        so.benefits,
        so.has_api,
        so.has_user_friendly_ui,
        so.has_grpc,
        so.has_extension,
        so.is_platform,
        so.has_incumbent_integration,
        so.is_available,
        so.model_id,
        so.version, 
        pr.name as provider_name,
        pr.logo as provider_logo,
        pr.type as provider_type
        FROM solutions so
        left join providers pr on pr.id=so.provider_id
    `;

      baseQuery = `${baseQuery} WHERE true=true`;

      if (req.query) {
        const { id, provider_id, name, organization_creator_id } = req.query;
        const masterUserId = await getWaipifyMasterUserID();
        if (id) {
          baseQuery = `${baseQuery} AND so.id = '${id}'`;
        } else {
          if (provider_id) {
            baseQuery = `${baseQuery} AND so.provider_id = '${provider_id}'`;
          }

          if (organization_creator_id) {
            baseQuery = `${baseQuery} AND (so.organization_creator_id = '${organization_creator_id} OR so.organization_creator_id = '${masterUserId})'`;
          }

          if (name) {
            baseQuery = `${baseQuery} AND so.name like '%${name}%'`;
          }
        }
      }

      if (req.query.limit && req.query.page) {
        const page = Number(req.query.page);
        const pageSize = Number(req.query.limit);
        const offset = page * pageSize;
        baseQuery = `${baseQuery} LIMIT ${pageSize} OFFSET ${offset} `;
      }

      const solutions = await prisma.$queryRawUnsafe(baseQuery);

      return res.status(200).json({ solutions });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await solutionSchema.validateAsync(data);
      const { organization_id, provider_id, model_id, ...solutionData } = data;
      const organization = await prisma.organizations.findFirstOrThrow({
        where: { id: organization_id },
      });
      if (provider_id) {
        await prisma.providers.findFirstOrThrow({
          where: { id: provider_id },
        });
      }
      if (model_id) {
        await prisma.models.findFirstOrThrow({
          where: { id: model_id },
        });
      }

      const solution = await prisma.solutions.create({
        data: {
          id: getNewUUID(),
          organization_creator_id: organization.creator_id,
          provider_id: provider_id || null,
          model_id: model_id,
          ...solutionData,
        },
      });
      return res.status(201).json({ solution });
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
