import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "POST") {
    try {
      let entriesCount = `select count(e.id) as e_count FROM entries e
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join business_impact bi on bi.entry_id= e.id
        left join solutions so on so.id=e.winner_solution_id`;

      let totalSolutions = `select count(DISTINCT cts.solution_id) as total_pr FROM entries e
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join business_impact bi on bi.entry_id= e.id
        left join case_to_solution cts on cts.case_id=e.case_id
        left join solutions so on so.id=cts.solution_id`;

      let totalImpact = `select sum(bi.estimated_value) as total_im FROM entries e
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join business_impact bi on bi.entry_id= e.id
        left join solutions so on so.id=e.winner_solution_id`;

      let inProductionImpact = `select sum(bi.estimated_value) as production_im FROM entries e
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join business_impact bi on bi.entry_id= e.id
        left join solutions so on so.id=e.winner_solution_id
        left join statuses sta on sta.id=e.status_id
        where sta.name = 'In Production'`;

      let baseQuery = `select 
        e.id,
        e.reference,
        e.name,
        e.case_id, 
        e.task_id, 
        e.is_winner,
        e.winner_solution_id, 
        e.winner_solution_is_custom, 
        e.report_id,
        e.department_id,
        e.status_id,
        e.planned, 
        e.goal,
        e.assessment,
        c.name as case_name,
        c.description as case_description,
        t.name as task_name, 
        t.risk as task_risk,
        d.name as department,
        pr.name as provider_name, 
        pr.logo as provider_logo ,
        so.description as description,
        IF(e.winner_solution_is_custom = 0, so.name, mo.name) AS entry_solution_name,
        IF(e.winner_solution_is_custom = 0, pr.logo, "") AS entry_solution_logo,
        so.name as solution_name,
        so.organization_creator_id as organization_creator_id,
        so.has_api as has_api, 
        so.has_user_friendly_ui as has_user_friendly_ui,
        so.has_grpc as has_grpc, 
        so.has_extension as has_extension,
        so.is_platform as is_platform, 
        so.has_incumbent_integration as has_incumbent_integration,
        so.logo_url as solution_logo_url,
        so.is_url_valid as solution_is_url_valid,
        cts.needs_allocation as needs_allocation,
        cts.impact_starts as impact_starts,
        cts.feasibility_number as feasibility_number,
        sta.name as status,
        sta.hex_colour_value as status_colour,
        bi.id as business_impact_id,
        bi.can_perform_other_tasks as can_perform_other_tasks,
        bi.has_high_replacement_cost as has_high_replacement_cost,
        bi.has_direct_impact as has_direct_impact,
        bi.open_new_revenue_stream as open_new_revenue_stream,
        bi.repeats_yearly as repeats_yearly,
        bi.time_per_outcomes as time_per_outcomes,
        bi.strategic_value as strategic_value,
        bi.time_per_outcomes_after_ai as time_per_outcomes_after_ai,
        bi.reduced_process_time_from as reduced_process_time_from,
        bi.reduced_process_time_to as reduced_process_time_to,
        bi.employee_hourly_rate as employee_hourly_rate,
        bi.total_cost_yearly as total_cost_yearly,
        bi.total_cost_yearly_after_ai as total_cost_yearly_after_ai,
        bi.revenue_increase_with_ai as revenue_increase_with_ai,
        bi.revenue_increase_with_ai as revenue_increase_with_ai,
        bi.is_not_quantifiable as is_not_quantifiable,
        bi.comments as business_impact_comments,
        bi.estimated_value as genai_impact,
        ba.id as business_area_id,
        ba.name as business_area_name,
        opp.id as opportunity_id,
        opp.name as opportunity_name,
        opp.organization_creator_id as opportunity_ocid,
        ind.id as industry_id,
        ind.name as industry_name,
        cat.id as industry_category_id,
        cat.name as category_name,
        oro.name as objective_name,
        CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('id', ik.id, 'name', ik.name, 'effect', ik.effect, 'unit', ik.unit, 'expected_impact', ik.expected_impact, 'type', ik.type )) separator ','), ']') AS kpis
        FROM entries e 
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join reports rp on rp.id=e.report_id
        left join departments d on d.id=e.department_id
        left join organization_objectives oro on oro.id=e.objective_id
        left join case_to_solution cts on cts.solution_id=e.winner_solution_id AND cts.case_id=e.case_id
        left join solutions so on so.id=e.winner_solution_id
        left join impact_kpis ik on ik.solution_id=e.winner_solution_id AND ik.case_id=e.case_id
        left join models mo on mo.id=e.winner_solution_id
        left join providers pr on pr.id=so.provider_id
        left join statuses sta on sta.id=e.status_id
        left join case_to_solution_reviews ctsr on ctsr.case_to_solution_id=cts.id
        left join feasibility_criteria fc on fc.id= ctsr.feasibility_criteria_id
        left join business_impact bi on bi.entry_id=e.id
        left join business_areas ba on ba.id=e.business_area_id
        left join opportunities opp on opp.id=e.opportunity_id
        left join industries ind on ind.id=e.industry_id
        left join industry_categories cat on cat.id COLLATE utf8mb4_unicode_ci=e.industry_category_id`;

      if (req.query || req.body) {
        if (req.query.report_id) {
          entriesCount = `${entriesCount} where e.report_id="${req.query.report_id}"`;
          totalSolutions = `${totalSolutions} where e.report_id="${req.query.report_id}"`;
          totalImpact = `${totalImpact} where e.report_id="${req.query.report_id}"`;
          inProductionImpact = `${inProductionImpact} AND e.report_id="${req.query.report_id}"`;
          baseQuery = `${baseQuery} where e.report_id="${req.query.report_id}"`;
        }

        if (req.query.winner_solution_id) {
          baseQuery = `${baseQuery} AND e.winner_solution_id="${req.query.winner_solution_id}"`;
        }

        if (req.body) {
          if (req.body.search_val) {
            entriesCount = `${entriesCount} AND (c.name like '%${req.body.search_val}%' OR t.name like '%${req.body.search_val}%')`;
            totalSolutions = `${totalSolutions} AND (c.name like '%${req.body.search_val}%' OR t.name like '%${req.body.search_val}%')`;
            totalImpact = `${totalImpact} AND (c.name like '%${req.body.search_val}%' OR t.name like '%${req.body.search_val}%')`;
            inProductionImpact = `${inProductionImpact} AND (c.name like '%${req.body.search_val}%' OR t.name like '%${req.body.search_val}%')`;
            baseQuery = `${baseQuery} AND (c.name like '%${req.body.search_val}%' OR t.name like '%${req.body.search_val}%')`;
          }
          if (req.body.impact) {
            const imapctData: any = req.body.impact;
            if (imapctData[0]) {
              entriesCount = `${entriesCount} AND bi.estimated_value >= ${imapctData[0]}`;
              totalSolutions = `${totalSolutions} AND bi.estimated_value >= ${imapctData[0]}`;
              totalImpact = `${totalImpact} AND bi.estimated_value >= ${imapctData[0]}`;
              inProductionImpact = `${inProductionImpact} AND bi.estimated_value >= ${imapctData[0]}`;
              baseQuery = `${baseQuery} AND bi.estimated_value >= ${imapctData[0]}`;
            }
            if (imapctData[1]) {
              entriesCount = `${entriesCount} AND bi.estimated_value <= ${imapctData[1]}`;
              totalSolutions = `${totalSolutions} AND bi.estimated_value <= ${imapctData[1]}`;
              totalImpact = `${totalImpact} AND bi.estimated_value <= ${imapctData[1]}`;
              inProductionImpact = `${inProductionImpact} AND bi.estimated_value <= ${imapctData[1]}`;
              baseQuery = `${baseQuery} AND bi.estimated_value <= ${imapctData[1]}`;
            }
          }

          if (req.body.business_area_ids?.length) {
            const idArray = req.body.business_area_ids
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND e.business_area_id IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND e.business_area_id IN (${idArray})`;
            totalImpact = `${totalImpact} AND e.business_area_id IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND e.business_area_id IN (${idArray})`;
            baseQuery = `${baseQuery} AND e.business_area_id IN (${idArray})`;
          }
          if (req.body.opportunity_ids?.length) {
            const idArray = req.body.opportunity_ids
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND e.opportunity_id IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND e.opportunity_id IN (${idArray})`;
            totalImpact = `${totalImpact} AND e.opportunity_id IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND e.opportunity_id IN (${idArray})`;
            baseQuery = `${baseQuery} AND e.opportunity_id IN (${idArray})`;
          }
          if (req.body.case_ids?.length) {
            const idArray = req.body.case_ids
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND e.case_id IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND e.case_id IN (${idArray})`;
            totalImpact = `${totalImpact} AND e.case_id IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND e.case_id IN (${idArray})`;
            baseQuery = `${baseQuery} AND e.case_id IN (${idArray})`;
          }
          if (req.body.status_ids?.length) {
            const idArray = req.body.status_ids
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND e.status_id IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND e.status_id IN (${idArray})`;
            totalImpact = `${totalImpact} AND e.status_id IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND e.status_id IN (${idArray})`;
            baseQuery = `${baseQuery} AND e.status_id IN (${idArray})`;
          }
          if (req.body.risks?.length) {
            const idArray = req.body.risks
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND t.risk IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND t.risk IN (${idArray})`;
            totalImpact = `${totalImpact} AND t.risk IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND t.risk IN (${idArray})`;
            baseQuery = `${baseQuery} AND t.risk IN (${idArray})`;
          }
          if (req.body.provider_ids?.length) {
            const idArray = req.body.provider_ids
              .map((_: string) => `'${_}'`)
              .join(",");
            entriesCount = `${entriesCount} AND so.id IN (${idArray})`;
            totalSolutions = `${totalSolutions} AND so.id IN (${idArray})`;
            totalImpact = `${totalImpact} AND so.id IN (${idArray})`;
            inProductionImpact = `${inProductionImpact} AND so.id IN (${idArray})`;
            baseQuery = `${baseQuery} AND so.id IN (${idArray})`;
          }
        }

        if (req.query.sortKey && req.query.sortDirection) {
          const sortkey =
            req.query.sortKey === "genai_impact"
              ? `CAST(${req.query.sortKey} AS UNSIGNED)`
              : req.query.sortKey;
          baseQuery = `${baseQuery} group by e.id,cts.id,bi.id,ba.id,opp.id,cat.id order by ${sortkey} ${req.query.sortDirection}, e.created_at desc`;
        } else {
          baseQuery = `${baseQuery} group by e.id,cts.id,bi.id,ba.id,opp.id,cat.id order by e.created_at desc`;
        }
        entriesCount = `${entriesCount} group by e.id order by e.created_at desc`;

        if (req.query.limit && req.query.page) {
          const page = Number(req.query.page);
          const pageSize = Number(req.query.limit);
          const offset = page * pageSize;
          baseQuery = `${baseQuery} LIMIT ${pageSize} OFFSET ${offset} `;
        }
      }

      const entries = prisma.$queryRawUnsafe(baseQuery);
      const [entryData, count, totalPr, totalIm, productionIm]: any = await Promise.all([
        entries,
        prisma.$queryRawUnsafe(entriesCount),
        prisma.$queryRawUnsafe(totalSolutions),
        prisma.$queryRawUnsafe(totalImpact),
        prisma.$queryRawUnsafe(inProductionImpact),
      ]);

      return res.status(200).json({
        entries: entryData,
        count: count.length,
        totalPr: totalPr[0].total_pr?.toString() || 0,
        totalIm: totalIm[0].total_im?.toString() || 0,
        productionIm: productionIm[0].production_im?.toString() || 0,
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
