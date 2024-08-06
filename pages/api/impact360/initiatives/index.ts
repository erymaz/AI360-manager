import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const initiativeSchema = Joi.object({
    name: Joi.string().required(),
    business_impact: Joi.string().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    period: Joi.string().required(),
    objective_id: Joi.string().required(),
    filial_id: Joi.string().allow(null).allow(""),

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
            let initiatives = [];
            if (req.query.id) {
                initiatives = await prisma.initiatives.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query) {
                const {filialId, name, skip, limit} = req.query;
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

                if (filialId) {
                    details["where"]["filial_id"] = String(filialId);
                }

                initiatives = await prisma.initiatives.findMany(details);
            } else {
                initiatives = await prisma.initiatives.findMany();
            }
            return res.status(200).json({initiatives});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await initiativeSchema.validateAsync(data);

            const {start_time, end_time, objective_id, ...initiativeData} = data;

            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: req.body.objective_id},
            });

            const initiative = await prisma.initiatives.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    start_time: new Date(start_time).toISOString(),
                    end_time: new Date(end_time).toISOString(),
                    objective_id: objective_id,
                    ...initiativeData,
                },
            });
            return res.status(201).json({initiative});
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
