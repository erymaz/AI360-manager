import {loadAiGenerators} from "@/generators/listing";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import Joi from "joi";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

export const config = {
    maxDuration: 300,
};

export interface TemplateWorkspace {
    color: string;
    name: string;
}

interface Generator {
    id: string;
}

interface WorkspaceEditFormData {
    workspaceName: string;
    logoUrl: string;
    template: TemplateWorkspace;
    generators: Generator[];
}

const workspaceEditDataSchema = Joi.object<WorkspaceEditFormData>({
    workspaceName: Joi.string().optional(),
    logoUrl: Joi.string().optional().allow(""),
    template: Joi.object().optional(),
    generators: Joi.array()
        .optional()
        .external(async (value: string[], helpers) => {
            if (!value) return value;
            const aiGenerators = loadAiGenerators();
            const generators = await aiGenerators;
            const generatorIds = generators.map((generator) => generator.name);

            const isValidGenerator = value.every((value) =>
                generatorIds.includes(value)
            );

            if (!isValidGenerator) {
                throw new Error("invalid generator id");
            }

            return value;
        }),
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

    if (req.method === "GET") {
        const workspaceId = req.query.workspaceId! as string;
        const ws = await workspaceService.getWorkspaceByTenantAndId(
            organisation.tenantId,
            workspaceId,
            clerkUserId,
            role
        );
        res.status(200).json(ws);
    } else if (req.method === "PUT") {
        let workspaceId = req.query.workspaceId;
        try {
            workspaceId = JSON.parse(req.query.workspaceId?.toString() as string);
        } catch (e) {
            console.log(e);
        }
        if (!workspaceId) {
            return res.status(400).end("workspaceId not provided");
        }

        const {body} = req;

        let isValid, error;
        try {
            isValid = await workspaceEditDataSchema.validateAsync(body);
        } catch (err) {
            error = err;
        }

        if (error) {
            res.status(400).json({error: error.toString()});
            return;
        }

        const existingWs = await workspaceService.getWorkspaceByTenantAndId(
            organisation.tenantId,
            workspaceId as string,
            clerkUserId,
            role
        );
        if (!existingWs) {
            res.status(404).json({error: "workspace does not exist"});
            return;
        }

        if (body.workspaceName) {
            existingWs.workspaceName = body.workspaceName;
        }
        if (body.template) {
            existingWs.template = body.template;
        }
        if (typeof body.logoUrl !== "undefined") {
            existingWs.logoUrl = body.logoUrl;
        }
        if (body.generators) {
            existingWs.generators = body.generators;
        }

        await workspaceService.updateWorkspace(existingWs, clerkUserId, role);

        res.status(200).end();
    } else if (req.method === "DELETE") {
        const workspaceId = req.query.workspaceId as string;
        if (!workspaceId) {
            return res.status(400).end("workspaceId not provided");
        }
        try {
            await workspaceService.deleteWorkspace(organisation.tenantId, clerkUserId, role, workspaceId);
        } catch (error: any) {
            res.status(500).json({error: error.toString()});
        }
        res.status(202).end();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
