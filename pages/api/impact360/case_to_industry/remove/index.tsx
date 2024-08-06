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
        const {cases_to_industry} = req.body;
        if (cases_to_industry && cases_to_industry.length > 0) {
            const result = await prisma.cases_to_industry.deleteMany({
                where: {
                    id: {in: cases_to_industry as string[]},
                },
            });
            return res.status(200).json(result);
        } else {
            return res.status(500).json({error: "cases to industry is required"});
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}