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
          models.name as name,
          models.id as id         
          FROM models
          LEFT JOIN 360organizations org on models.organization_creator_id = org.creator_id
          WHERE models.organization_creator_id="${organization_creator_id}"`;

                    let subcaseQuery = `SELECT 
          prv.name as name,
          prv.id as id
          FROM models 
          LEFT JOIN 360organizations org on models.organization_creator_id = org.creator_id
          LEFT JOIN providers prv on models.provider_id = prv.id
          WHERE models.organization_creator_id="${organization_creator_id}"`;

                    if (view === "admin") {
                        caseQuery += ` OR org.is_supervisor=true`;
                        subcaseQuery += ` OR org.is_supervisor=true`;
                    } else if (view === "supervisor") {
                        caseQuery += ` OR org.is_superadmin=true`;
                        subcaseQuery += ` OR org.is_superadmin=true`;
                    }

                    caseQuery += ` GROUP BY models.id order by models.name desc`;
                    subcaseQuery += ` GROUP BY prv.id order by prv.name desc`;

                    const mainModel = prisma.$queryRawUnsafe(caseQuery);
                    const mainProvider = prisma.$queryRawUnsafe(subcaseQuery);

                    const [models, providers]: any = await Promise.all([
                        mainModel,
                        mainProvider,
                    ]);

                    return res.status(200).json({
                        providers,
                        models,
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
