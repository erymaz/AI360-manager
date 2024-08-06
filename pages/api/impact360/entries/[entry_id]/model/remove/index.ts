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
    const result = await prisma.task_to_model.deleteMany({
      where: {
        id: { in: req.body.task_to_model_id as string[] },
        entry_id: String(req.query.entry_id),
      },
    });

    await Promise.all([result]);

    return res.status(200).json({ message: "Solution deleted successfully" });
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return withApiProtect(handler)(req, res);
}
