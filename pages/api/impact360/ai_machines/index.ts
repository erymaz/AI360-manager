import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const aiMachineSchema = Joi.object({
  name: Joi.string().required(),
  api_url: Joi.string().required(),
  api_key: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {userId} = getAuth(req);
  if (!userId) {
    return res.status(401).json({error: "User must be logged in"});
  }

  if (req.method === "GET") {
    try {
      let aiMachines = [];
      if (req.query) {
        const {skip, limit, id} = req.query;
        const details: any = {where: {}};

        if (id) {
          details["where"]["id"] = String(req.query["id"]);
        } else {
          if (skip && limit) {
            details["skip"] = Number(skip);
            details["limit"] = Number(limit);
          }
        }

        aiMachines = await prisma.ai_machines.findMany(
          details
        );
      } else {
        aiMachines = await prisma.ai_machines.findMany();
      }
      return res.status(200).json(aiMachines);
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await aiMachineSchema.validateAsync(data);
      const aiMachine = await prisma.ai_machines.create({
        data: {
          id: getNewUUID(),
          created_at: new Date().toISOString(),
          ...data,
        },
      });
      return res.status(201).json(aiMachine);
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
