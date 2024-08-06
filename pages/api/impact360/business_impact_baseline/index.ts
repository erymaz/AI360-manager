import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

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
            let businessImpacts = [];
            if (req.query) {
                const {skip, limit, id, entry_business_impact_id} = req.query;
                const details: any = {where: {}};

                if (id) {
                    details["where"]["id"] = String(req.query["id"]);
                } else {
                    if (entry_business_impact_id) {
                        details["where"]["entry_business_impact_id"] = String(
                            req.query["entry_business_impact_id"]
                        );
                    }

                    if (skip && limit) {
                        details["skip"] = Number(skip);
                        details["limit"] = Number(limit);
                    }
                }

                businessImpacts = await prisma.business_impact_baseline.findMany(
                    details
                );
            } else {
                businessImpacts = await prisma.business_impact_baseline.findMany();
            }
            return res.status(200).json(businessImpacts);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const baseline_ids = req.body.baseline;
            if (baseline_ids && baseline_ids.length > 0) {
                const ArrayInit = [];
                for (let i = 0; i < baseline_ids.length; i++) {
                    const details = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        ...baseline_ids[i],
                    };
                    ArrayInit.push(details);
                }

                const intiative_data = await prisma.business_impact_baseline.createMany(
                    {
                        data: ArrayInit,
                    }
                );
                return res.status(201).json({intiative_data});
            } else {
                throw new Error("Baseline is required");
            }
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        try {
            const {baseline} = req.body;
            if (baseline) {
                const transect_arr = [];
                for (let i = 0; i < baseline.length; i++) {
                    const {id, ...data} = baseline[i];
                    transect_arr.push(
                        prisma.business_impact_baseline.update({
                            where: {id: String(id)},
                            data: data,
                        })
                    );
                }
                const business_impact_value = await prisma.$transaction(transect_arr);
                return res.status(201).json(business_impact_value);
            } else {
                throw new Error("Baseline is required");
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
