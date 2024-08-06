import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {v4 as uuidv4} from "uuid";
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
    const {organizationId, filial_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let objectives: any = [];
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            // let baseQuery = `SELECT *,fl.name as filial_name FROM organization_objectives  join filials fl on fl.id=organization_objectives.filial_id`;
            if (organizationId) {
                // baseQuery = `${baseQuery} where 360organization_id="${organizationId}"`;
                objectives = await prisma.organization_objectives.findMany({
                    where: {
                        organization_id: String(organizationId),
                    },
                });
            } else if (req.query.name) {
                objectives = await prisma.organization_objectives.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                        organization_id: String(organizationId),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                objectives = await prisma.organization_objectives.findMany({
                    where: {
                        organization_id: String(organizationId),
                    },
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                objectives = await prisma.organization_objectives.findMany();
            }
            // const objective_data = await prisma.$queryRawUnsafe(baseQuery);
            // const objective_Array = [];
            // for (let index = 0; index < objectives.length; index++) {
            //   const element: any = objectives[index];
            //   const filal_data: any = await prisma.filials.findFirst({
            //     where: {
            //       id: String(element.filial_id),
            //     },
            //   });
            //   objective_Array.push({
            //     ...element,
            //     filial_info: { id: filal_data?.id, name: filal_data?.name },
            //   });
            // }
            // console.log({objectives});
            // const initiatives: any = await prisma.$queryRawUnsafe(baseQuery);
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
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            const {start_time, end_time, ...objectiveData} = data;

            const objective = await prisma.organization_objectives.create({
                data: {
                    id: uuidv4(),
                    organization_id: String(organizationId),
                    created_at: new Date().toISOString(),
                    start_time: new Date(start_time).toISOString(),
                    end_time: new Date(end_time).toISOString(),
                    ...objectiveData,
                },
            });
            return res.status(201).json({objective});
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
