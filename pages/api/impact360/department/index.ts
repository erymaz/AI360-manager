import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const departmentSchema = Joi.object({
    name: Joi.string().required(),
    filial_id: Joi.string().required(),
});

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
            let departments = [];
            if (req.query.id) {
                departments = await prisma.departments.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query) {
                const {filial_id, name, skip, limit} = req.query;
                const details: any = {where: {}};

                if (skip && limit) {
                    details["skip"] = Number(skip);
                    details["limit"] = Number(limit);
                }

                if (name) {
                    details["where"]["name"] = {
                        contains: String(name),
                    };
                }

                if (filial_id) {
                    details["where"]["filial_id"] = String(filial_id);
                }

                departments = await prisma.departments.findMany(details);
            } else {
                departments = await prisma.departments.findMany();
            }
            return res.status(200).json({departments});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await departmentSchema.validateAsync(data);
            await prisma.filials.findFirstOrThrow({
                where: {id: req.body.filial_id},
            });

            const department = await prisma.departments.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...data,
                },
            });
            return res.status(201).json({department});
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
