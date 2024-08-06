import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const periodSchema = Joi.object({
    name: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {statusId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.period.findFirstOrThrow({
                where: {id: String(statusId)},
            });
            const data = req.body;
            await periodSchema.validateAsync(data);

            const status = await prisma.period.update({
                where: {id: String(statusId)},
                data: req.body,
            });

            return res.status(201).json({status});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.period.findFirstOrThrow({
                where: {id: String(statusId)},
            });
            const status = await prisma.period.delete({
                where: {id: String(statusId)},
            });
            return res
                .status(200)
                .json({status, message: "Period deleted successfully"});
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
