import prisma, {getNewUUID} from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";

// Change task_to_solution_reviews to case_to_solution_reviews

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authData: AuthData
) {
  const {userId} = getAuth(req);
  if (!userId) {
      return res.status(401).json({error: "User must be logged in"});
  }

  if (req.method === "POST") {
    try {
      // Get task_to_solution_reviews
      const getQuery = `SELECT
        ttsr.id,
        ttsr.task_to_solution_id,
        ttsr.feasibility_criteria_id,
        ttsr.reviewer_organization_id,
        ttsr.score,
        ttsr.comment,
        tts.solution_id,
        e.case_id
        FROM task_to_solution_reviews ttsr
        LEFT JOIN task_to_solution tts ON tts.id=ttsr.task_to_solution_id
        LEFT JOIN entries e ON e.id=ttsr.entry_id
        WHERE tts.solution_id IS NOT NULL AND ttsr.reviewer_organization_id IS NOT NULL`;

      const ttsrs: any = await prisma.$queryRawUnsafe(getQuery);
      for (const ttsr of ttsrs) {
        await prisma.$transaction(async (tx) => {
          const caseToSolution = await tx.case_to_solution.findFirst({
            where: {
              case_id: ttsr.case_id,
              solution_id: ttsr.solution_id,
            }
          });
          if (caseToSolution) {
            await tx.case_to_solution_reviews.upsert({
              where: {
                case_to_solution_id_feasibility_criteria_id_reviewer_organization_id: {
                  case_to_solution_id: caseToSolution.id,
                  feasibility_criteria_id: ttsr.feasibility_criteria_id,
                  reviewer_organization_id: ttsr.reviewer_organization_id,
                }
              },
              update: {
                score: ttsr.score,
                comment: ttsr.comment,
              },
              create: {
                id: getNewUUID(),
                case_to_solution_id: caseToSolution.id,
                feasibility_criteria_id: ttsr.feasibility_criteria_id,
                reviewer_organization_id: ttsr.reviewer_organization_id,
                score: ttsr.score,
                comment: ttsr.comment,
              },
            });
          }
        },
        {
          maxWait: 5000,
          timeout: 10000,
        });
      }

      return res.status(200).json({ success: true });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return withApiProtect(handler)(req, res);
}
