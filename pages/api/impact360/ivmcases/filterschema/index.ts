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

    if (req.method === "GET") {
        try {
            if (req.query) {
                const {organization_creator_id, view} = req.query;

                if (view) {
                    let caseQuery = `SELECT 
          cs.name as name,
          cs.id as id         
          FROM tasks ts 
          LEFT JOIN 360organizations org on ts.organization_creator_id = org.creator_id
          LEFT JOIN cases cs on ts.case_id = cs.id 
          WHERE cs.id IS NOT NULL AND cs.name IS NOT NULL AND (ts.organization_creator_id="${organization_creator_id}"`;

                    let taskQuery = `SELECT 
          ts.name as name,
          ts.id as id
          FROM tasks ts 
          LEFT JOIN 360organizations org on ts.organization_creator_id = org.creator_id
          WHERE ts.id IS NOT NULL AND ts.name IS NOT NULL AND (ts.organization_creator_id="${organization_creator_id}"`;

                    let createdbyQuery = `SELECT * FROM 360organizations WHERE creator_id="${organization_creator_id}"`;

                    if (view === "admin") {
                        caseQuery += ` OR org.is_supervisor=true)`;
                        taskQuery += ` OR org.is_supervisor=true)`;
                        createdbyQuery += ` OR is_supervisor=true`;
                    } else if (view === "supervisor") {
                        caseQuery += ` OR org.is_superadmin=true)`;
                        taskQuery += ` OR org.is_superadmin=true)`;
                        createdbyQuery += ` OR is_superadmin=true`;
                    }

                    caseQuery += ` GROUP BY cs.id order by cs.name desc`;
                    taskQuery += ` GROUP BY ts.id order by ts.name desc`;

                    const mainCases = prisma.$queryRawUnsafe(caseQuery);
                    const mainTask = prisma.$queryRawUnsafe(taskQuery);
                    const mainCreator = prisma.$queryRawUnsafe(createdbyQuery);

                    const [cases, tasks, creators]: any = await Promise.all([
                        mainCases,
                        mainTask,
                        mainCreator,
                    ]);

                    return res.status(200).json({
                        cases,
                        tasks,
                        creators,
                    });
                }
            } else {
                return res.status(200).json({error: "Organization is required"});
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
