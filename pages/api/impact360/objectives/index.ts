import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const objectiveSchema = Joi.object({
    name: Joi.string().required(),
    business_impact: Joi.string().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    period: Joi.string().required(),
    filial_id: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {filialId, objectiveId, skip, limit} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let objectives: any = [];
            if (objectiveId) {
                objectives = await prisma.organization_objectives.findMany({
                    where: {
                        id: String(objectiveId),
                    },
                });
            } else if (req.query) {
                const details: any = {where: {}};
                if (filialId) {
                    details["where"]["filial_id"] = String(filialId);
                }
                if (skip && limit) {
                    details["skip"] = Number(skip);
                    details["limit"] = Number(limit);
                }

                objectives = await prisma.organization_objectives.findMany(details);
            } else {
                objectives = await prisma.organization_objectives.findMany();
            }
            return res.status(200).json({objectives});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await objectiveSchema.validateAsync(data);

            const {start_time, end_time, objective_id, ...objectivesData} = data;

            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: req.body.objective_id},
            });

            const objectives = await prisma.organization_objectives.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    start_time: new Date(start_time).toISOString(),
                    end_time: new Date(end_time).toISOString(),
                    ...objectivesData,
                },
            });
            return res.status(201).json({objectives});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        try {
            await prisma.filials.findFirstOrThrow({
                where: {id: String(req.body.filial_id)},
            });
            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: String(objectiveId)},
            });
            const objective = await prisma.organization_objectives.update({
                where: {id: String(objectiveId)},
                data: {filial_id: req.body.filial_id},
            });
            return res.status(201).json({objective});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.filials.findFirstOrThrow({
                where: {id: String(req.body.filial_id)},
            });
            await prisma.organization_objectives.findFirstOrThrow({
                where: {id: String(objectiveId)},
            });
            const objective = await prisma.organization_objectives.delete({
                where: {id: String(objectiveId)},
            });
            return res
                .status(200)
                .json({objective, message: "Objective deleted successfully"});
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
