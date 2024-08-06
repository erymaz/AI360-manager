import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as organisationService from "@/lib/services/organisation";
import * as workspaceService from "@/lib/services/workspace";
import {Role} from "@/types";
import {NextApiRequest, NextApiResponse} from "next";
import {clerkClient, getAuth} from "@clerk/nextjs/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    {organisation, clerkUserId, role}: AuthData
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }


    if (req.method === "DELETE") {
        const {tenantId} = req.query;

        if (!tenantId) {
            return res.status(400).end("tenantId not provided");
        }

        if (organisation.tenantId !== tenantId || role !== Role.OWNER) {
            return res.status(400).json({
                error: "general.validation_failed",
            });
        }
  

        const email = await clerkClient.users.getUser(clerkUserId).then(user => user.emailAddresses[0].emailAddress);

        if (email !== organisation.email) {
            return res.status(400).json({
                error: "general.validation_failed",
            });
        }

        try {
            await workspaceService.deleteWorkspaces(tenantId.toString());
            await organisationService.deleteOrganisation(tenantId.toString());
            res.status(202).end();
        } catch (e: any) {
            res.status(500).json({
                error: "general.something_went_wrong",
            });
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
