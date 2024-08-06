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
      let businessAreasQuery = `SELECT
        ba.id as id,
        ba.name as name
        FROM entries e
        LEFT JOIN business_areas ba on ba.id=e.business_area_id
        WHERE e.business_area_id IS NOT NULL AND e.report_id="${req.query.report_id}"
        GROUP BY ba.id
        ORDER BY ba.name asc`;

      let useCasesQuery = `SELECT
        ca.id as id,
        ca.name as name
        FROM entries e
        LEFT JOIN cases ca on ca.id=e.case_id
        WHERE e.case_id IS NOT NULL AND e.report_id="${req.query.report_id}"
        GROUP BY ca.id
        ORDER BY ca.name asc`;

      let opportunitiesQuery = `SELECT
        opp.id as id,
        opp.name as name
        FROM entries e
        LEFT JOIN opportunities opp on opp.id=e.opportunity_id
        WHERE e.opportunity_id IS NOT NULL AND e.report_id="${req.query.report_id}"
        GROUP BY opp.id
        ORDER BY opp.name asc`;

      let bestProviders = `SELECT
        so.id as id,
        so.name as name,
        mo.id as model_id,
        mo.name as model_name
        FROM entries e
        left join solutions so on so.id=e.winner_solution_id
        left join models mo on mo.id=e.winner_solution_id
        WHERE e.winner_solution_id IS NOT NULL AND e.report_id="${req.query.report_id}"
        GROUP BY so.id,mo.id
        ORDER BY so.name,mo.name asc`;

      const [businessAreas, providers, useCases, opportunities]: any = await Promise.all([
        prisma.$queryRawUnsafe(businessAreasQuery),
        prisma.$queryRawUnsafe(bestProviders),
        prisma.$queryRawUnsafe(useCasesQuery),
        prisma.$queryRawUnsafe(opportunitiesQuery),
      ]);

      return res.status(200).json({
        businessAreas,
        providers,
        useCases,
        opportunities,
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
