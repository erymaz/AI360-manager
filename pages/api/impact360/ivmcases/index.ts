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
            let cases: any = [];

            if (req.query) {
                const {id, page, limit, organization_creator_id, view} = req.query;

                if (view) {
                    let casesCount = `SELECT CAST(COUNT(*) AS CHAR(32)) as count
          FROM tasks ts 
          LEFT JOIN 360organizations org on ts.organization_creator_id = org.creator_id
          LEFT JOIN cases cs on ts.case_id = cs.id 
          WHERE (ts.organization_creator_id="${organization_creator_id}"`;

                    let baseQuery =
                        `SELECT
            cs.name as case_name,
            cs.id as case_id,
            ts.name as task_name,
            ts.id as task_id,
            ts.risk,
            CONCAT('[', GROUP_CONCAT(DISTINCT(JSON_OBJECT('name', indu.name)) separator ','), ']') AS industry,
            MAX(ts.created_at) as last_task_date,
            ANY_VALUE(org.name) as organization
            FROM tasks ts
            LEFT JOIN 360organizations org on ts.organization_creator_id = org.creator_id
            LEFT JOIN cases cs on ts.case_id = cs.id
            LEFT JOIN cases_to_industry cti on cti.case_id COLLATE utf8mb4_0900_ai_ci = ts.case_id
            LEFT JOIN industries indu on indu.id COLLATE utf8mb4_0900_ai_ci = cti.industry_id
            WHERE (ts.organization_creator_id="${organization_creator_id}"`;

                    if (view === "admin") {
                        baseQuery += ` OR org.is_supervisor=true)`;
                        casesCount += ` OR org.is_supervisor=true)`;
                    } else if (view === "supervisor") {
                        baseQuery += ` OR org.is_superadmin=true)`;
                        casesCount += ` OR org.is_superadmin=true)`;
                    }

                    if (req.body) {
                        if (req.body.search_val) {
                            casesCount = `${casesCount} AND (cs.name like '%${req.body.search_val}%' OR ts.name like '%${req.body.search_val}%')`;
                            baseQuery = `${baseQuery} AND (cs.name like '%${req.body.search_val}%' OR ts.name like '%${req.body.search_val}%')`;
                        }

                        if (req.body.created_at) {
                            const imapctData: any = req.body.created_at;
                            if (imapctData[0]) {
                                const newDate = imapctData[0].split("-").join("");
                                casesCount = `${casesCount} AND ts.created_at >= ${newDate}`;
                                baseQuery = `${baseQuery} AND ts.created_at >= ${newDate}`;
                            }
                            if (imapctData[1]) {
                                const newDate = imapctData[1].split("-").join("");
                                casesCount = `${casesCount} AND ts.created_at <= ${newDate}`;
                                baseQuery = `${baseQuery} AND ts.created_at <= ${newDate}`;
                            }
                        }

                        if (req.body.case_ids?.length) {
                            const idArray = req.body.case_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND ts.case_id IN (${idArray})`;
                            baseQuery = `${baseQuery} AND ts.case_id IN (${idArray})`;
                        }

                        if (req.body.task_ids?.length) {
                            const idArray = req.body.task_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND ts.id IN (${idArray})`;
                            baseQuery = `${baseQuery} AND ts.id IN (${idArray})`;
                        }

                        if (req.body.industry_ids?.length) {
                            const idArray = req.body.industry_ids;
                            const industryIds = idArray
                                .filter((ind: string | null) => ind !== null)
                                .map((ind: string) => `'${ind}'`)
                                .join(",");
                            if (industryIds.length) {
                                casesCount = `${casesCount} AND ${
                                    idArray.includes(null)
                                        ? `(cs.industry_id IN (${industryIds}) OR cs.industry_id IS NULL)`
                                        : `cs.industry_id IN (${industryIds})`
                                }`;
                                baseQuery = `${baseQuery} AND ${
                                    idArray.includes(null)
                                        ? `(cs.industry_id IN (${industryIds}) OR cs.industry_id IS NULL)`
                                        : `cs.industry_id IN (${industryIds})`
                                }`;
                            } else {
                                casesCount = `${casesCount} AND  cs.industry_id IS NULL`;
                                baseQuery = `${baseQuery} AND cs.industry_id IS NULL`;
                            }
                        }

                        if (req.body.risk_ids?.length) {
                            const idArray = req.body.risk_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND ts.risk IN (${idArray})`;
                            baseQuery = `${baseQuery} AND ts.risk IN (${idArray})`;
                        }

                        if (req.body.createdby_ids?.length) {
                            const idArray = req.body.createdby_ids
                                .map((_: string) => `'${_}'`)
                                .join(",");
                            casesCount = `${casesCount} AND org.id IN (${idArray})`;
                            baseQuery = `${baseQuery} AND org.id IN (${idArray})`;
                        }
                    }

                    baseQuery += ` GROUP BY ts.id order by ts.created_at desc`;
                    casesCount += ` GROUP BY ts.id`;

                    if (limit && page) {
                        const offset = Number(page) * Number(limit);
                        baseQuery = `${baseQuery} LIMIT ${Number(limit)} OFFSET ${offset}`;
                    }

                    const mainCases = prisma.$queryRawUnsafe(baseQuery);
                    const CountCases = prisma.$queryRawUnsafe(casesCount);

                    const [casesData, otdata]: any = await Promise.all([
                        mainCases,
                        CountCases,
                    ]);

                    return res.status(200).json({
                        cases: casesData,
                        count: otdata.length,
                    });
                }
            } else {
                cases = await prisma.cases.findMany();
                return res.status(200).json({cases});
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
