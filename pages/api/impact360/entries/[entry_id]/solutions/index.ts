import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const caseToSolutionSchema = Joi.object({
  id: Joi.string().allow(null).allow(""),
  case_id: Joi.string().required(),
  solution_id: Joi.string().required(),
  suggested: Joi.boolean().required(),
  needs_allocation: Joi.boolean().required(),
  impact_starts: Joi.string().required(),
  // entry_id: Joi.string().required(),
  feasibility_number: Joi.string().allow(null).allow(""),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entry_id, case_id, solution_id } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let baseQuery = `select 
        cts.id,
        cts.case_id,
        cts.feasibility_number ,
        cts.impact_starts,
        cts.needs_allocation,
        cts.suggested,
        ca.name as name,
        pr.id as provider_id,
        pr.name as provider_name ,
        pr.logo as provider_logo,
        pr.type as provider_type,
        so.id as solution_id,
        so.name as solution_name,
        so.description as description,
        so.organization_creator_id as organization_creator_id,
        so.has_api as has_api,
        so.has_user_friendly_ui as has_user_friendly_ui,
        so.has_grpc as has_grpc,
        so.has_extension as has_extension,
        so.is_platform as is_platform,
        so.has_incumbent_integration as has_incumbent_integration,
        so.logo_url as solution_logo_url,
        so.is_url_valid as solution_is_url_valid,
        json_arrayagg(
          json_object(
            'id', ctsr.id,
            'case_to_solution_id',cts.id,
            'feasibility_criteria_id',fc.id,
            'feasibility_criteria_name',fc.name,
            'score',ctsr.score,
            'comment',ctsr.comment
          )
        ) as solution_entry_reviews
        FROM case_to_solution cts
        left join entries en on en.case_id=cts.case_id
        left join cases ca on ca.id=cts.case_id
        left join solutions so on so.id=cts.solution_id
        left join providers pr on pr.id=so.provider_id
        left join case_to_solution_reviews ctsr on ctsr.case_to_solution_id=cts.id
        left join feasibility_criteria fc on fc.id=ctsr.feasibility_criteria_id
        where en.id="${entry_id}"`;

      if (req.query.id) {
        baseQuery = `${baseQuery} AND cts.id="${req.query.id}" group by cts.id`;
      } else {
        if (case_id) {
          baseQuery = `${baseQuery} AND cts.case_id="${case_id}"`;
        }
        if (solution_id) {
          baseQuery = `${baseQuery} AND cts.solution_id="${solution_id}"`;
        }

        baseQuery = `${baseQuery} group by cts.id`;

        if (req.query.limit && req.query.skip) {
          baseQuery = `${baseQuery} LIMIT ${req.query.limit} OFFSET ${req.query.skip}`;
        }
      }

      const case_to_solution: any = await prisma.$queryRawUnsafe(baseQuery);
      return res.status(200).json(case_to_solution);
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const { solutions } = req.body;
      if (solutions && solutions.length > 0) {
        const solution_arr: any = [];
        for (let i = 0; i < solutions.length; i++) {
          const details = {
            id: solutions[i].id ? solutions[i].id : getNewUUID(),
            created_at: new Date().toISOString(),
            ...solutions[i],
          };
          solution_arr.push(details);
        }
        const case_to_solution = await prisma.case_to_solution.createMany({
          data: solution_arr,
        });

        return res.status(201).json({ case_to_solution });
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
