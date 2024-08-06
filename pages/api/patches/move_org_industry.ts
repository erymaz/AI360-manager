import prisma, {getNewUUID} from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";

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
      // Get orgs
      const orgs = await prisma.organizations.findMany();

      for (const org of orgs) {
        if (!org.industry_id) {
          continue;
        }
        await prisma.$transaction(async (tx) => {
          const exists = await tx.classifications.findFirst({
            where: {
              organization_id: org.id,
              industry_id: org.industry_id!,
            }
          });

          if (!exists) {
            await tx.classifications.create({
              data: {
                id: getNewUUID(),
                organization_id: org.id,
                industry_id: org.industry_id!,
                industry_category_id: ''
              }
            });
          }
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
