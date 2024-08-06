import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const departmentSchema = Joi.object({
    name: Joi.string(),
    filial_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {departmentId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.departments.findFirstOrThrow({
                where: {id: String(departmentId)},
            });
            const data = req.body;
            await departmentSchema.validateAsync(data);
            if (req.body.filial_id) {
                await prisma.filials.findFirstOrThrow({
                    where: {id: req.body.filial_id},
                });
            }

            const department = await prisma.departments.update({
                where: {id: String(departmentId)},
                data: req.body,
            });

            return res.status(201).json({department});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.departments.findFirstOrThrow({
                where: {id: String(departmentId)},
            });
            const department = await prisma.departments.delete({
                where: {id: String(departmentId)},
            });
            return res
                .status(200)
                .json({department, message: "Department deleted successfully"});
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
