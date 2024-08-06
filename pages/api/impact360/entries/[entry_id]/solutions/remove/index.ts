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
        const resultttsr = await prisma.case_to_solution_reviews.deleteMany({
            where: {
                case_to_solution_id: {in: req.body.case_to_solution_id as string[]},
            },
        });

        const result = await prisma.case_to_solution.deleteMany({
            where: {
                id: {in: req.body.case_to_solution_id as string[]},
            },
        });

        await Promise.all([resultttsr, result]);

        return res.status(200).json({message: "Solution deleted successfully"});
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}