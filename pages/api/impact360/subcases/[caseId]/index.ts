import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect, AuthData} from "@/lib/services/auth";
import {getWaipifyMasterUserID} from "@/lib/services/userdetails";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const subcaseSchema = Joi.object({
    name: Joi.string().required(),
    country_id: Joi.string().required(),
    region_id: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
    original_id: Joi.string().allow(null).allow(""),
    organization_id: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    authData: AuthData
) {
    const {caseId, ...mainData} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let subcases = [];
            if (req.query) {
                const {id, skip, limit, organization_creator_id, name} = mainData;
                const masterUserId = await getWaipifyMasterUserID();
                const details: any = {where: {AND: []}};

                const caseDetails = await prisma.cases.findFirstOrThrow({
                    where: {id: String(caseId)},
                });

                if (id) {
                    details["where"]["id"] = String(id);
                } else {
                    let removeRecordQuery = ` SELECT DISTINCT original_id
          FROM subcases WHERE
          organization_creator_id="${organization_creator_id}" AND original_id IS NOT NULL AND (case_id="${caseId}" OR case_id="${
            caseDetails.original_id
          }")${name ? ` AND name LIKE "%${name}%"` : ""}`;

                    let removeRecordIds: any = await prisma.$queryRawUnsafe(
                        removeRecordQuery
                    );

                    details["where"]["id"] = {
                        notIn: removeRecordIds.map((rec: any) => rec.original_id),
                    };

                    if (organization_creator_id) {
                        details["where"]["AND"].push({
                            OR: [
                                {organization_creator_id: organization_creator_id},
                                {organization_creator_id: masterUserId},
                            ],
                        });
                    }

                    if (caseId) {
                        const caseArray = [{case_id: caseId}];
                        if (caseDetails.original_id) {
                            caseArray.push({case_id: caseDetails.original_id});
                        }
                        details["where"]["AND"].push({
                            OR: caseArray,
                        });
                    }

                    if (name) {
                        details["where"]["name"] = {
                            contains: String(name),
                        };
                    }

                    if (skip && limit) {
                        details["skip"] = Number(skip);
                        details["limit"] = Number(limit);
                    }
                }
                subcases = await prisma.subcases.findMany(details);
            } else {
                subcases = await prisma.subcases.findMany();
            }
            return res.status(200).json({subcases});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await subcaseSchema.validateAsync(data);
            await prisma.cases.findFirstOrThrow({
                where: {id: String(caseId)},
            });

            const {organization_id, ...subcaseData} = req.body;

            const organization = await prisma.organizations.findFirstOrThrow({
                where: {id: String(organization_id)},
            });

            const currentsubcase = await prisma.subcases.findFirst({
                where: {
                    organization_creator_id: organization.creator_id,
                    name: req.body.name,
                    case_id: String(caseId),
                },
            });

            if (currentsubcase) {
                return res.status(409).json({error: "Subcase already exists"});
            } else {
                const subcase = await prisma.subcases.create({
                    data: {
                        id: getNewUUID(),
                        case_id: String(caseId),
                        author_id: authData.clerkUserId,
                        organization_creator_id: organization.creator_id,
                        ...subcaseData,
                    },
                });
                return res.status(201).json({subcase});
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
