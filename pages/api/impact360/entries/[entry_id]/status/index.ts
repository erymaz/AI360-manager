import prisma from "@/lib/prisma";
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
            let baseQuery = `SELECT e.status_id,sta.name as status_name FROM entries e
      join statuses sta on sta.id=e.status_id
        `;
            if (req.query.entryId) {
                baseQuery = `${baseQuery} where e.id="${req.query.entryId}"`;
            } else {
                return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
            const status: any = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json(status[0]);
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