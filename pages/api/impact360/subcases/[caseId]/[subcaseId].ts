import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const subcaseSchema = Joi.object({
    name: Joi.string(),
    country_id: Joi.string().allow(null),
    region_id: Joi.number().allow(null),
    description: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {caseId, subcaseId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.cases.findFirstOrThrow({
                where: {id: String(caseId)},
            });
            await prisma.subcases.findFirstOrThrow({
                where: {id: String(subcaseId)},
            });
            const data = req.body;
            await subcaseSchema.validateAsync(data);

            const subcase = await prisma.subcases.update({
                where: {id: String(subcaseId)},
                data: req.body,
            });

            return res.status(201).json({subcase});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.cases.findFirstOrThrow({
                where: {id: String(caseId)},
            });
            await prisma.subcases.findFirstOrThrow({
                where: {id: String(subcaseId)},
            });
            const subcase = await prisma.subcases.delete({
                where: {id: String(subcaseId)},
            });
            return res
                .status(200)
                .json({subcase, message: "Subcase deleted successfully"});
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
