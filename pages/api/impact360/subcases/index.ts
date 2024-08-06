import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import {getWaipifyMasterUserID} from "@/lib/services/userdetails";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const subcaseSchema = Joi.object({
    name: Joi.string().required(),
    country_id: Joi.string().required(),
    region_id: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
    organization_id: Joi.string().required(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {...mainData} = req.query;

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
                const details: any = {where: {}};

                if (id) {
                    details["where"]["id"] = String(id);
                } else {
                    if (organization_creator_id) {
                        details["where"]["AND"] = {
                            OR: [
                                {organization_creator_id: organization_creator_id},
                                {organization_creator_id: masterUserId},
                            ],
                        };
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
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
