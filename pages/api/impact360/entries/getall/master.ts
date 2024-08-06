import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getWaipifyMasterUserID } from "@/lib/services/userdetails";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      const masterUserId = await getWaipifyMasterUserID();

      let totalSolutions = `select count(DISTINCT cts.solution_id) as total_so
        FROM entries e
        left join case_to_solution cts on cts.case_id=e.case_id
        WHERE e.creator_organization_id = '${masterUserId}' AND e.original_id IS NULL`;

      let baseQuery = `select 
        e.id,
        e.reference,
        e.name,
        e.case_id,
        e.report_id,
        e.industry_id,
        e.industry_category_id,
        c.name as case_name,
        c.description as case_description,
        t.name as task_name,
        sta.name as status,
        ba.id as business_area_id,
        ba.name as business_area_name,
        CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('id', ik.id, 'name', ik.name, 'effect', ik.effect, 'unit', ik.unit, 'expected_impact', ik.expected_impact, 'type', ik.type )) separator ','), ']') AS kpis
        FROM entries e 
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join statuses sta on sta.id=e.status_id
        left join business_areas ba on ba.id=e.business_area_id
        left join impact_kpis ik on ik.solution_id=e.winner_solution_id AND ik.case_id=e.case_id
        WHERE e.creator_organization_id = '${masterUserId}' AND e.original_id IS NULL`;

      const { business_area_ids, case_ids } = req.query;

      const _case_ids = JSON.parse(String(case_ids)) as string[];
      const _business_area_ids = JSON.parse(String(business_area_ids)) as string[];
      if (_case_ids?.length) {
        const caseIdArr = _case_ids.join("','");
        baseQuery = `${baseQuery} AND e.case_id IN ('${caseIdArr}')`;
        totalSolutions = `${totalSolutions} AND e.case_id IN ('${caseIdArr}')`;
      } else if (_business_area_ids?.length) {
        const businessAreaIdArr = _business_area_ids.join("','");
        baseQuery = `${baseQuery} AND e.business_area_id IN ('${businessAreaIdArr}')`;
        totalSolutions = `${totalSolutions} AND e.business_area_id IN ('${businessAreaIdArr}')`;
      }

      baseQuery = `${baseQuery} group by e.id order by e.created_at desc`;

      const [entries, totalSo]: any = await Promise.all([
        prisma.$queryRawUnsafe(baseQuery),
        prisma.$queryRawUnsafe(totalSolutions)
      ]);
      return res.status(200).json({
        entries,
        totalSolutions: totalSo[0].total_so?.toString() || 0,
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
