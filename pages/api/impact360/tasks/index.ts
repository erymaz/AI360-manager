import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import {getWaipifyMasterUserID} from "@/lib/services/userdetails";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskSchema = Joi.object({
    name: Joi.string().required(),
    case_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    description: Joi.string().allow(null).allow(""),
    original_id: Joi.string().allow(null).allow(""),
    risk: Joi.string().allow(null).allow(""),
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
            let tasks = [];
            if (req.query) {
                const {
                    skip,
                    limit,
                    id,
                    case_id,
                    organization_creator_id,
                    name,
                } = req.query;
                const masterUserId = await getWaipifyMasterUserID();
                let details: any = {where: {AND: []}};

                if (id) {
                    details["where"]["id"] = String(req.query["id"]);
                } else {
                    let mainDetails = null;
                    let removeRecordQuery = ` SELECT DISTINCT original_id
          FROM tasks WHERE
          organization_creator_id="${organization_creator_id}" AND original_id IS NOT NULL${
            name ? ` AND name LIKE "%${name}%"` : ""
          }`;

                    if (case_id) {
                        mainDetails = await prisma.cases.findFirstOrThrow({
                            where: {id: String(case_id)},
                        });
                        removeRecordQuery += ` AND (case_id="${case_id}" OR case_id="${mainDetails.original_id}")`;
                    }

                    let removeRecordIds: any = await prisma.$queryRawUnsafe(
                        removeRecordQuery
                    );

                    details["where"]["id"] = {
                        notIn: removeRecordIds.map((rec: any) => rec.original_id),
                    };

                    if (case_id) {
                        details["where"]["AND"].push({
                            OR: [{case_id: case_id}, {case_id: mainDetails?.original_id}],
                        });
                    }

                    if (organization_creator_id) {
                        details["where"]["AND"].push({
                            OR: [
                                {organization_creator_id: organization_creator_id},
                                {organization_creator_id: masterUserId},
                            ],
                        });
                    }

                    if (name) {
                        details["where"]["name"] = {
                            contains: String(name),
                        };
                    }

                    if (limit && skip) {
                        details["limit"] = Number(limit);
                        details["skip"] = Number(skip);
                    }
                }
                tasks = await prisma.tasks.findMany(details);
                if (tasks.length === 0) {
                    if (case_id) {
                        const {...newWhere} = details["where"];
                        details["where"] = newWhere;
                        details["where"]["case_id"] = String(case_id);
                    }
                    tasks = await prisma.tasks.findMany(details);
                }
            } else {
                tasks = await prisma.tasks.findMany();
            }
            return res.status(200).json({tasks});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await taskSchema.validateAsync(data);
            const {case_id, organization_id, ...taskData} = data;
            const organization = await prisma.organizations.findFirstOrThrow({
                where: {id: organization_id},
            });
            await prisma.cases.findFirstOrThrow({
                where: {id: case_id},
            });

            const currentTask = await prisma.tasks.findFirst({
                where: {
                    organization_creator_id: organization.creator_id,
                    name: data.name,
                    case_id: String(case_id),
                },
            });

            if (currentTask) {
                return res.status(409).json({error: "Task already exists"});
            } else {
                const task = await prisma.tasks.create({
                    data: {
                        id: getNewUUID(),
                        case_id,
                        organization_creator_id: organization.creator_id,
                        created_at: new Date().toISOString(),
                        ...taskData,
                    },
                });
                return res.status(201).json({task});
            }
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
