import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect } from "@/lib/services/auth";
import { getAuth } from "@clerk/nextjs/server";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entry_id, task_id, model_id } = req.query;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (req.method === "GET") {
    try {
      let baseQuery = `select 
        tm.id,
        tm.task_id,
        tm.entry_id,
        tm.model_id,
        tm.model_capabilities,
        tm.development_description,
        tm.suggested,
        ta.name as name,
        mo.name as model_name
        FROM task_to_model tm
        left join entries en on en.id=tm.entry_id
        left join tasks ta on ta.id=tm.task_id
        left join models mo on mo.id=tm.model_id
        where en.id="${entry_id}"`;

      if (req.query.id) {
        baseQuery = `${baseQuery} AND tm.id="${req.query.id}"`;
      } else {
        if (task_id) {
          baseQuery = `${baseQuery} AND tm.task_id="${task_id}"`;
        }
        if (model_id) {
          baseQuery = `${baseQuery} AND tm.model_id="${model_id}"`;
        }
        baseQuery = `${baseQuery} group by tm.id`;

        if (req.query.limit && req.query.skip) {
          baseQuery = `${baseQuery} LIMIT ${req.query.limit} OFFSET ${req.query.skip}`;
        }
      }

      const task_to_model: any = await prisma.$queryRawUnsafe(baseQuery);
      return res.status(200).json(task_to_model);
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const { models } = req.body;
      if (models && models.length > 0) {
        const models_arr: any = [];
        for (let i = 0; i < models.length; i++) {
          const details = {
            id: models[i].id ? models[i].id : getNewUUID(),
            created_at: new Date().toISOString(),
            ...models[i],
          };
          models_arr.push(details);
        }
        const task_to_model = await prisma.task_to_model.createMany({
          data: models_arr,
        });

        return res.status(201).json({ task_to_model });
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
