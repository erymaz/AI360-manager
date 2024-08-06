import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as userWorkspaceService from "@/lib/services/user-workspace";
import Joi from "joi";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const userWorkspaceDeleteSchema = Joi.object({
    email: Joi.string().required().email(),
});

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
        const {workspaceId} = req.query;
        const {body} = req;
        try {
            await userWorkspaceDeleteSchema.validateAsync(body);
        } catch (e: any) {
            return res.status(400).json({error: e.toString()});
        }

        try {
            await userWorkspaceService.removeUserFromWorkspace(
                organisation.tenantId,
                workspaceId!.toString(),
                clerkUserId,
                role,
                body.email
            );
            return res.status(202).end();
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
