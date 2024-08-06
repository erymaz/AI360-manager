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

                let providerQuery = `SELECT 
                    prv.name as name,
                    prv.id as id         
                    FROM providers prv 
                    LEFT JOIN 360organizations org on prv.organzation_creator_id = org.creator_id
                    WHERE prv.organzation_creator_id="${organization_creator_id}"`;

                let solutionQuery = `SELECT 
                    slt.name as name,
                    slt.id as id
                    FROM providers prv 
                    LEFT JOIN 360organizations org on prv.organzation_creator_id = org.creator_id
                    LEFT JOIN solutions slt on prv.id = slt.provider_id 
                    WHERE prv.organzation_creator_id="${organization_creator_id}"`;

                let createdbyQuery = `SELECT * FROM 360organizations WHERE creator_id="${organization_creator_id}"`;

                if (view === "admin") {
                    providerQuery += ` OR org.is_supervisor=true`;
                    solutionQuery += ` OR org.is_supervisor=true`;
                    createdbyQuery += ` OR is_supervisor=true`;
                } else if (view === "supervisor") {
                    providerQuery += ` OR org.is_superadmin=true`;
                    solutionQuery += ` OR org.is_superadmin=true`;
                    createdbyQuery += ` OR is_superadmin=true`;
                }

                providerQuery += ` GROUP BY prv.id order by prv.name desc`;
                solutionQuery += ` GROUP BY slt.id order by slt.name desc`;

                const mainProvider = prisma.$queryRawUnsafe(providerQuery);
                const mainSolution = prisma.$queryRawUnsafe(solutionQuery);
                const mainCreator = prisma.$queryRawUnsafe(createdbyQuery);

                const [providers, solutions, creators]: any = await Promise.all([
                    mainProvider,
                    mainSolution,
                    mainCreator,
                ]);

                return res.status(200).json({
                    providers,
                    solutions,
                    creators,
                });
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
