import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "POST") {
        try {
            let providers: any = [];

            if (req.query) {
                const {id, page, limit, organization_creator_id, view} = req.query;

                const ncquery = "SET SESSION group_concat_max_len = 60000;";
                await prisma.$queryRawUnsafe(ncquery);

                let providerCount = `SELECT CAST(COUNT(*) AS CHAR(32)) as count
                    FROM providers prv
                    LEFT JOIN 360organizations org on prv.organzation_creator_id = org.creator_id
                    LEFT JOIN solutions slt on prv.id = slt.provider_id 
                    WHERE (prv.organzation_creator_id="${organization_creator_id}"`;

                let baseQuery = `SELECT 
                    prv.name,
                    prv.logo,
                    prv.type,
                    prv.id,
                    ANY_VALUE(org.name) as created_by,
                    CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('id', slt.id, 'name', slt.name, 'description', slt.description )) separator ','), ']') AS solutions,
                    CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('name', md.name)) separator ','), ']') AS models,
                    AVG(cts.feasibility_number) AS average_fn
                    FROM providers prv
                    LEFT JOIN 360organizations org on prv.organzation_creator_id = org.creator_id
                    LEFT JOIN solutions slt on prv.id = slt.provider_id
                    LEFT JOIN models md on md.id = slt.model_id
                    LEFT JOIN case_to_solution cts on cts.solution_id = slt.id
                    WHERE (prv.organzation_creator_id="${organization_creator_id}"`;

                if (view === "admin") {
                    baseQuery += ` OR org.is_supervisor=true)`;
                    providerCount += ` OR org.is_supervisor=true)`;
                } else if (view === "supervisor") {
                    baseQuery += ` OR org.is_superadmin=true)`;
                    providerCount += ` OR org.is_superadmin=true)`;
                }

                if (req.body) {
                    if (req.body.search_val) {
                        providerCount = `${providerCount} AND (prv.name like '%${req.body.search_val}%' OR slt.name like '%${req.body.search_val}%' OR prv.type like '%${req.body.search_val}%')`;
                        baseQuery = `${baseQuery} AND (prv.name like '%${req.body.search_val}%' OR slt.name like '%${req.body.search_val}%' OR prv.type like '%${req.body.search_val}%')`;
                    }

                    if (req.body.provider_ids?.length) {
                        const idArray = req.body.provider_ids
                            .map((_: string) => `'${_}'`)
                            .join(",");
                        providerCount = `${providerCount} AND prv.id IN (${idArray})`;
                        baseQuery = `${baseQuery} AND prv.id IN (${idArray})`;
                    }
                    if (req.body.solution_ids?.length) {
                        const idArray = req.body.solution_ids
                            .map((_: string) => `'${_}'`)
                            .join(",");
                        providerCount = `${providerCount} AND slt.id IN (${idArray})`;
                        baseQuery = `${baseQuery} AND slt.id IN (${idArray})`;
                    }

                    if (req.body.type_ids?.length) {
                        const idArray = req.body.type_ids
                            .map((_: string) => `'${_}'`)
                            .join(",");
                        providerCount = `${providerCount} AND prv.type IN (${idArray})`;
                        baseQuery = `${baseQuery} AND prv.type IN (${idArray})`;
                    }

                    if (req.body.createdby_ids?.length) {
                        const idArray = req.body.createdby_ids
                            .map((_: string) => `'${_}'`)
                            .join(",");
                        providerCount = `${providerCount} AND org.id IN (${idArray})`;
                        baseQuery = `${baseQuery} AND org.id IN (${idArray})`;
                    }
                }

                baseQuery += ` GROUP BY prv.id ORDER BY prv.created_at desc`;
                providerCount += ` GROUP BY prv.id`;

                if (limit && page) {
                    const offset = Number(page) * Number(limit);
                    baseQuery = `${baseQuery} LIMIT ${Number(limit)} OFFSET ${offset}`;
                }

                const mainProvider = prisma.$queryRawUnsafe(baseQuery);
                const CountProvider = prisma.$queryRawUnsafe(providerCount);

                const [providerData, otdata]: any = await Promise.all([
                    mainProvider,
                    CountProvider,
                ]);

                return res.status(200).json({
                    providers: providerData,
                    count: otdata.length,
                });
            } else {
                providers = await prisma.providers.findMany();
                return res.status(200).json({providers});
            }
        } catch (e: any) {
            console.log(e);
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
