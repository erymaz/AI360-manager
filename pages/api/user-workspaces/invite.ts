import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as userWorkspaceService from "@/lib/services/user-workspace";
import {UserWorkspaceDto, WorkspaceRole} from "@/types";
import Joi from "joi";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const userWorkspaceDataSchema = Joi.object<UserWorkspaceDto>({
    tenantId: Joi.string().required(),
    workspaceId: Joi.string().required(),
    workspaceRole: Joi.string().valid(...Object.values(WorkspaceRole)),
    userId: Joi.string().optional().allow(null),
    email: Joi.string().required().email(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
}).external(async (value: UserWorkspaceDto, helpers) => {
    const userWorkspaceAlreadyExists =
        await userWorkspaceService.getWorkspaceUserExists(
            value.workspaceId,
            value.email
        );
    if (userWorkspaceAlreadyExists) {
        throw new Error("User is already in the workspace");
    }
    return value;
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    {clerkUserId, role}: AuthData
) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "POST") {
        const body = req.body as UserWorkspaceDto;

        try {
            await userWorkspaceDataSchema.validateAsync(body);
        } catch (e: any) {
            res.status(400).json({error: e.toString()});
            return;
        }

        try {
            const invitedUser = await userWorkspaceService.inviteMemberToWorkspace(
                body.tenantId,
                clerkUserId,
                role,
                body
            );
            res.status(201).json(invitedUser);
        } catch (e: any) {
            res.status(500).json({
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
