import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let kpis = [];

      if (req.query) {
        const { skip, limit, case_ids } = req.query;
        const details: any = { where: { AND: [] } };

        if (case_ids) {
          const cases = JSON.parse(String(case_ids)) as string[];
          details["where"]["case_id"] = {
            in: cases
          };
        }

        if (skip && limit) {
          details["skip"] = Number(skip);
          details["limit"] = Number(limit);
        }

        details["orderBy"] = [{ name: "asc" }];
        kpis = await prisma.impact_kpis.findMany(details);
      } else {
        kpis = await prisma.cases.findMany();
      }
      return res.status(200).json({ kpis });
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
