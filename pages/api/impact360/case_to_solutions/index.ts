import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const caseToSolutionSchema = Joi.object({
  case_id: Joi.string().required(),
  solution_id: Joi.string().required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let case_to_solutions = [];
      if (req.query.id) {
        case_to_solutions = await prisma.case_to_solution.findMany({
          where: {
            id: String(req.query.id),
          },
        });
      } else {
        const { case_id, solution_id, limit, skip } = req.query;
        case_to_solutions = await prisma.case_to_solution.findMany({
          where: {
            ...(case_id ? {case_id: String(case_id)} : {}),
            ...(solution_id ? {solution_id: String(solution_id)} : {})
          },
          skip: Number(req.query.skip),
          take: Number(req.query.limit),
        });
      }
      return res.status(200).json({ case_to_solutions });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await caseToSolutionSchema.validateAsync(data);
      await prisma.cases.findFirstOrThrow({
        where: { id: req.body.case_id },
      });
      await prisma.solutions.findFirstOrThrow({
        where: { id: req.body.solution_id },
      });
      const case_to_solution = await prisma.case_to_solution.create({
        data: {
          id: getNewUUID(),
          created_at: new Date().toISOString(),
          ...req.body,
        },
      });
      return res.status(201).json({ case_to_solution });
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
