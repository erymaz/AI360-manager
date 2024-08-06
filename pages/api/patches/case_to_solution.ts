import prisma, {getNewUUID} from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";

// Change task_to_solution to case_to_solution also winner_solution_id from task_to_solution_id to case_to_solution_id

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
      // Get task_to_solutions
      const getQuery = `SELECT
        tts.id,
        tts.solution_id,
        tts.suggested,
        tts.impact_starts,
        tts.needs_allocation,
        tts.entry_id,
        tts.feasibility_number,
        e.case_id,
        e.winner_solution_id
        FROM task_to_solution tts
        LEFT JOIN entries e ON e.id=tts.entry_id`;

      const ttss: any = await prisma.$queryRawUnsafe(getQuery);
      for (const tts of ttss) {
        await prisma.$transaction(async (tx) => {
          const newCTS = await tx.case_to_solution.upsert({
            where: {
              case_id_solution_id: {
                case_id: tts.case_id,
                solution_id: tts.solution_id,
              }
            },
            update: {
              feasibility_number: tts.feasibility_number,
              impact_starts: tts.impact_starts,
              needs_allocation: !!tts.needs_allocation,
              suggested: !!tts.suggested,
            },
            create: {
              id: getNewUUID(),
              case_id: tts.case_id,
              solution_id: tts.solution_id,
              feasibility_number: tts.feasibility_number,
              impact_starts: tts.impact_starts,
              needs_allocation: !!tts.needs_allocation,
              suggested: !!tts.suggested,
            },
          });

          if (tts.winner_solution_id) {
            await tx.entries.update({
              data: {
                winner_solution_id: String(newCTS.id),
              },
              where: {
                id: tts.entry_id,
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
