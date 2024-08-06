import prisma from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";

const caseToSolutionSchema = Joi.object({
  case_id: Joi.string(),
  solution_id: Joi.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { caseToSolutionId } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.case_to_solution.findFirstOrThrow({
        where: { id: String(caseToSolutionId) },
      });
      const data = req.body;
      await caseToSolutionSchema.validateAsync(data);

      if (req.body.case_id) {
        await prisma.cases.findFirstOrThrow({
          where: { id: req.body.case_id },
        });
      }

      if (req.body.solution_id) {
        await prisma.solutions.findFirstOrThrow({
          where: { id: req.body.solution_id },
        });
      }

      const case_to_solution = await prisma.case_to_solution.update({
        where: { id: String(caseToSolutionId) },
        data: req.body,
      });

      return res.status(201).json({ case_to_solution });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.case_to_solution.findFirstOrThrow({
        where: { id: String(caseToSolutionId) },
      });
      const case_to_solution = await prisma.case_to_solution.delete({
        where: { id: String(caseToSolutionId) },
      });
      return res.status(200).json({
        case_to_solution,
        message: "Case to solution deleted successfully",
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
