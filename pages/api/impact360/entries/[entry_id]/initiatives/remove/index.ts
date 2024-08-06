import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "POST") {
        const result = await prisma.entry_to_initiatives.deleteMany({
            where: {
                initiative_id: {in: req.body.initiative_id as string[]},
                entry_id: String(req.query.entry_id),
            },
        });
        return res.status(200).json(result);
    } else if (req.method === "DELETE") {
        const result = await prisma.entry_to_initiatives.deleteMany({
            where: {
                entry_id: String(req.query.entry_id),
            },
        });
        return res.status(200).json(result);
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}