import prisma from "@/lib/prisma";
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

    if (req.method === "POST") {
        try {
            let models: any = [];

            if (req.query) {
                const {page, limit, organization_creator_id, view} = req.query;

                if (view) {
                    const ncquery = "SET SESSION group_concat_max_len = 60000;";
                    await prisma.$queryRawUnsafe(ncquery);

                    let casesCount = `SELECT CAST(COUNT(*) AS CHAR(32)) as count
          FROM models
          LEFT JOIN 360organizations org on models.organization_creator_id = org.creator_id
          LEFT JOIN providers prv on models.provider_id = prv.id 
          WHERE (models.organization_creator_id="${organization_creator_id}"`;

                    let baseQuery = `SELECT 
          models.id,
          models.name,
          models.description,
          models.main_capability_name,
          ANY_VALUE(org.name) as created_by,
          CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('name', prv.name, 'logo', prv.logo, 'type', prv.type )) separator ','), ']') AS providers
          FROM models
          LEFT JOIN 360organizations org on models.organization_creator_id = org.creator_id
          LEFT JOIN providers prv on prv.id = models.provider_id 
          WHERE (models.organization_creator_id="${organization_creator_id}"`;

                    if (view === "admin") {
                        baseQuery += ` OR org.is_supervisor=true)`;
                        casesCount += ` OR org.is_supervisor=true)`;
                    } else if (view === "supervisor") {
                        baseQuery += ` OR org.is_superadmin=true)`;
                        casesCount += ` OR org.is_superadmin=true)`;
                    }

                    if (req.body) {
                        if (req.body.search_val) {
                            casesCount = `${casesCount} AND (models.name like '%${req.body.search_val}%' OR prv.name like '%${req.body.search_val}%' OR prv.type like '%${req.body.search_val}%')`;
                            baseQuery = `${baseQuery} AND (models.name like '%${req.body.search_val}%' OR prv.name like '%${req.body.search_val}%' OR prv.type like '%${req.body.search_val}%')`;
                        }

                        if (req.body.model_ids?.length) {
                            const idArray = req.body.model_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND models.id IN (${idArray})`;
                            baseQuery = `${baseQuery} AND models.id IN (${idArray})`;
                        }
                        if (req.body.provider_ids?.length) {
                            const idArray = req.body.provider_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND prv.id IN (${idArray})`;
                            baseQuery = `${baseQuery} AND prv.id IN (${idArray})`;
                        }

                        if (req.body.type_ids?.length) {
                            const idArray = req.body.type_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND prv.type IN (${idArray})`;
                            baseQuery = `${baseQuery} AND prv.type IN (${idArray})`;
                        }

                        // if (req.body.createdby_ids?.length) {
                        //   const idArray = req.body.createdby_ids
                        //     .map((_: string) => `'${_}'`)
                        //     .join(",");
                        //   casesCount = `${casesCount} AND org.id IN (${idArray})`;
                        //   baseQuery = `${baseQuery} AND org.id IN (${idArray})`;
                        // }
                    }

                    baseQuery += ` GROUP BY models.id ORDER BY models.created_at desc`;
                    casesCount += ` GROUP BY models.id`;

                    if (limit && page) {
                        const offset = Number(page) * Number(limit);
                        baseQuery = `${baseQuery} LIMIT ${Number(limit)} OFFSET ${offset}`;
                    }

                    const mainModel = prisma.$queryRawUnsafe(baseQuery);
                    const CountModel = prisma.$queryRawUnsafe(casesCount);

                    const [modelData, otdata]: any = await Promise.all([
                        mainModel,
                        CountModel,
                    ]);

                    return res.status(200).json({
                        models: modelData,
                        count: otdata.length,
                    });
                }
            } else {
                models = await prisma.models.findMany();
                return res.status(200).json({models});
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
