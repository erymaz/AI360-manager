import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let baseQuery = `SELECT e.id, e.entry_id, e.initiative_id,iv.name as name, iv.period as period
                FROM entry_to_initiatives e
                JOIN initiatives iv on iv.id=e.initiative_id`;
            if (req.query.entry_id) {
                baseQuery = `${baseQuery} where e.entry_id="${req.query.entry_id}"`;
            } else {
                return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
            const initiatives: any = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json(initiatives);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        const result = await prisma.entry_to_initiatives.update({
            where: <any>{id: String(req.query.initiative_id)},
            data: {initiative_id: String(req.body.initiative_id)},
        });
        return res.status(200).json(result);
    } else if (req.method === "DELETE") {
        const result = await prisma.entry_to_initiatives.deleteMany({where: {id: {in: req.query.initiative_id as string[]}}})
        return res.status(200).json(result);
    } else if (req.method === "POST") {
        try {
            const initiative_ids = req.body.initiative_id
            if (initiative_ids && initiative_ids.length > 0) {
                const ArrayInit = []
                for (let i = 0; i < initiative_ids.length; i++) {
                    const details = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        entry_id: String(req.query.entry_id),
                        initiative_id: initiative_ids[i]
                    }
                    ArrayInit.push(details)
                }

                const intiative_data = await prisma.entry_to_initiatives.createMany({
                    data: ArrayInit,
                });
                return res.status(201).json({intiative_data});
            } else {
                throw new Error("Initiative is required")
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
