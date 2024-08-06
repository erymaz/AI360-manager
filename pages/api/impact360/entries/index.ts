import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const entrySchema = Joi.object({
  name: Joi.string().allow(null).allow(""),
  business_area_id: Joi.string().allow(null).allow(""),
  opportunity_id: Joi.string().allow(null).allow(""),
  case_id: Joi.string().required(),
  task_id: Joi.string().required(),
  provider_id: Joi.string().allow(null).allow(""),
  locale_id: Joi.string().allow(null).allow(""),
  winner_solution_id: Joi.string().allow(null).allow(""),
  winner_solution_is_custom: Joi.boolean().default(false),
  planned: Joi.string().allow(null).allow(""),
  report_id: Joi.string().allow(null).allow(""),
  objective_id: Joi.string().allow(null).allow(""),
  department_id: Joi.string().allow(null).allow(""),
  status_id: Joi.string().allow(null).allow(""),
  business_impact: Joi.number().allow(null).allow(""),
  feasibility_number: Joi.number().allow(null).allow(""),
  use_case_key: Joi.string().allow(null).allow(""),
  task_key: Joi.string().allow(null).allow(""),
  creator_organization_id: Joi.string().required(),
  time_to_impact: Joi.string().allow(null).allow(""),
  assessment: Joi.string().allow(null).allow(""),
  goal: Joi.string().allow(null).allow(""),
  industry_id: Joi.string().allow(null).allow(""),
  industry_category_id: Joi.string().allow(null).allow(""),
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authData: AuthData
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
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
        c.description as case_discription,
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
        rp.name as report_name,
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
        oro.name as objective_name 
        FROM entries e 
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join reports rp on rp.id=e.report_id
        left join departments d on d.id=e.department_id
        left join organization_objectives oro on oro.id=e.objective_id
        left join case_to_solution cts on cts.solution_id=e.winner_solution_id AND cts.case_id=e.case_id
        left join solutions so on so.id=e.winner_solution_id
        left join models mo on mo.id=e.winner_solution_id
        left join providers pr on pr.id=so.provider_id
        left join statuses sta on sta.id=e.status_id
        left join case_to_solution_reviews ctsr on ctsr.case_to_solution_id= cts.id
        left join feasibility_criteria fc on fc.id= ctsr.feasibility_criteria_id
        left join business_impact bi on bi.entry_id=e.id
        left join business_areas ba on ba.id=e.business_area_id
        left join opportunities opp on opp.id=e.opportunity_id
        left join industries ind on ind.id=e.industry_id
        left join industry_categories cat on cat.id COLLATE utf8mb4_unicode_ci=e.industry_category_id
      `;

      if (req.query.id) {
        baseQuery = `${baseQuery} where e.id="${req.query.id}" `;
      }
      if (req.query.winner_solution_id) {
        baseQuery = `${baseQuery} where e.winner_solution_id="${req.query.winner_solution_id}" `;
      } else if (req.query.filterKey && req.query.filterValue) {
        baseQuery = `${baseQuery} where e.${req.query.filterKey} like '%${req.query.filterValue}%'`;
      }

      if (req.query.report_id) {
        baseQuery = `${baseQuery} where e.report_id="${req.query.report_id}"`;
      }
      if (req.query.sortKey && req.query.sortDirection) {
        baseQuery = `${baseQuery} order by ${req.query.sortKey} ${req.query.sortDirection}`;
      }
      if (req.query.limit && req.query.skip) {
        baseQuery = `${baseQuery} LIMIT ${req.query.limit} OFFSET ${req.query.skip}`;
      }

      baseQuery = `${baseQuery} group by e.id, cts.id, bi.id, ba.id,opp.id,cat.id`;
      let entries: any = await prisma.$queryRawUnsafe(baseQuery);

      return res.status(200).json(entries);
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await entrySchema.validateAsync(data);
      if (req.body.locale_id) {
        await prisma.locale.findFirstOrThrow({
          where: { id: req.body.locale_id },
        });
      }

      if (req.body.department_id) {
        await prisma.departments.findFirstOrThrow({
          where: { id: req.body.department_id },
        });
      }

      if (req.body.status_id) {
        await prisma.statuses.findFirstOrThrow({
          where: { id: req.body.status_id },
        });
      }

      const { task_id, case_id, report_id, creator_organization_id } = req.body;

      const [entry_data] = await Promise.all([
        prisma.entries.findFirst({
          where: {
            case_id: case_id,
            task_id: task_id,
            report_id: report_id,
          },
        }),
        prisma.organizations.findFirstOrThrow({
          where: { creator_id: creator_organization_id },
        }),
        prisma.cases.findFirstOrThrow({
          where: { id: case_id },
        }),
        prisma.tasks.findFirstOrThrow({
          where: { id: task_id },
        }),
      ]);

      if (entry_data) {
        return res.status(409).json({ error: "Entry already exists" });
      } else {
        const lastEntry = await prisma.entries.findMany({
          where: {
            report_id: report_id,
          },
          orderBy: [
            {
              created_at: "desc",
            },
          ],
          take: 1,
        });

        let reference = "";
        if (lastEntry.length) {
          const index = Number(lastEntry[0].reference?.lastIndexOf("-"));
          const prefix = lastEntry[0].reference?.slice(0, index + 1);
          const uN = Number(lastEntry[0].reference?.slice(index + 1));
          reference = `${prefix}${(uN + 1).toString().padStart(6, "0")}`;
        } else {
          const report = await prisma.reports.findFirstOrThrow({
            where: { id: report_id },
          });
          const filial = await prisma.filials.findFirstOrThrow({
            where: { id: report.filial_id! },
          });
          const filialName = String(filial.name)
            ?.toUpperCase()
            ?.split(" ")
            ?.join("");
          const filialAbbr = `${filialName[0]}${filialName[1]}`;

          let reportAbbr = "";
          const reportName = String(report.name)
            ?.toUpperCase()
            ?.split(" ")
            ?.join("");
          if (reportName?.length > 2) {
            reportAbbr = `${reportName[0]}${reportName[1]}${reportName[2]}`;
          } else {
            reportAbbr = `${reportName[0]}${reportName[1]}`;
          }
          const prefix = `${filialAbbr}-${reportAbbr}-`;
          const _entries = await prisma.entries.findMany({
            where: {
              reference: {
                contains: prefix,
              },
            },
            distinct: ["report_id"],
          });
          if (!_entries.length) {
            reference = `${prefix}000001`;
          } else {
            const newSuffix = String.fromCharCode(_entries.length + 64);
            reference = `${prefix}${newSuffix}-000001`;
          }
        }

        const entry = await prisma.entries.create({
          data: {
            id: getNewUUID(),
            author_id: authData.clerkUserId,
            ...req.body,
            reference,
          },
        });

        return res.status(201).json({ entry });
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
