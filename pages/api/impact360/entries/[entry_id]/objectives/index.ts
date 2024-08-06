import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

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
            let baseQuery = `SELECT eto.id,eto.entry_id, eto.objective_id,iv.name as name FROM entry_to_objectives eto 
      join organization_objectives iv on iv.id COLLATE utf8mb4_unicode_ci = eto.objective_id
     `;
            if (req.query.entry_id) {
                baseQuery = `${baseQuery} where eto.entry_id="${req.query.entry_id}"`;
            } else {
                return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
            const objectives: any = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json(objectives);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        const result = await prisma.entry_to_objectives.update({
            where: <any>{id: String(req.query.objective_id)},
            data: {objective_id: String(req.body.objective_id)},
        });
        return res.status(200).json(result);
    } else if (req.method === "DELETE") {
        const result = await prisma.entry_to_objectives.deleteMany({where: {id: {in: req.query.objective_id as string[]}}})
        return res.status(200).json(result);
    } else if (req.method === "POST") {
        try {
            const objective_ids = req.body.objective_id
            if (objective_ids && objective_ids.length > 0) {
                const ArrayInit = []
                for (let i = 0; i < objective_ids.length; i++) {
                    const details = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        entry_id: String(req.query.entry_id),
                        objective_id: objective_ids[i]
                    }
                    ArrayInit.push(details)
                }

                const objectives = await prisma.entry_to_objectives.createMany({
                    data: ArrayInit,
                });
                return res.status(201).json({objectives});
            } else {
                throw new Error("Objective is required")
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
