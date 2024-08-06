import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const reportSchema = Joi.object({
  name: Joi.string().required(),
  preview_url: Joi.string().required(),
  slug: Joi.string().required(),
  time_zone: Joi.date().required(),
  default_currency_code: Joi.string().required(),
  default_locale: Joi.string().required(),
});

async function getUsersDataByIds(userIds: string[]) {
  const userPromises = userIds.map(async (userId) => {
    const user = await clerkClient.users.getUser(userId);
    return user;
  });

  return Promise.all(userPromises);
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authData: AuthData
) {
  const { filialId } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let reports = [];
      // 360organization_id
      // let reportdata:any = 'SELECT \`rp.360organization_id\` as org_name FROM reports rp';
      if (req.query.id) {
        reports = await prisma.reports.findMany({
          where: {
            id: String(req.query.id),
            filial_id: String(filialId),
          },
        });
      } else if (req.query.name) {
        reports = await prisma.reports.findMany({
          where: {
            name: {
              contains: String(req.query.name),
            },
            filial_id: String(filialId),
          },
        });
      } else if (req.query.limit && req.query.skip) {
        reports = await prisma.reports.findMany({
          where: {
            filial_id: String(filialId),
          },
          skip: Number(req.query.skip),
          take: Number(req.query.limit),
        });
      } else {
        reports = await prisma.reports.findMany({
          where: {
            filial_id: String(filialId),
          },
        });
      }
      const userIds: string[] = [];
      for (const report of reports) {
        if (report.user_id && !userIds.includes(report.user_id)) {
          userIds.push(report.user_id);
        }
      }
      if (!userIds.length) {
        return res.status(200).json({ reports });
      }

      const users = await getUsersDataByIds(userIds);
      const _reports = reports.map((report) => {
        const user = users.find((_: any) => _.id === report.user_id);
        return {
          ...report,
          ...(user ? { createdBy: `${user.firstName} ${user.lastName}` } : {}),
        };
      });

      return res.status(200).json({ reports: _reports });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await reportSchema.validateAsync(data);
      const filial = await prisma.filials.findFirstOrThrow({
        where: { id: String(filialId) },
      });
      const reportDetail = await prisma.reports.findFirst({
        where: {
          name: String(data.name),
          filial_id: String(filial.id),
        },
      });
      if (reportDetail) {
        throw new Error("Report name already exist!");
      }
      const report = await prisma.reports.create({
        data: {
          id: getNewUUID(),
          organization_id: filial.organization_id,
          filial_id: filial.id,
          user_id: authData.clerkUserId,
          ...req.body,
          time_zone: new Date(req.body.time_zone).toISOString(),
        },
      });
      return res.status(201).json({ report });
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
