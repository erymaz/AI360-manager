import {loadAiGenerators} from "@/generators/listing";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import {TemplateWorkspace} from "@/pages/api/workspaces/[workspaceId]";
import Joi from "joi";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

export const config = {
    maxDuration: 300,
};

interface Generator {
    id: string;
}

interface WorkspaceFormData {
    tenantId: string;
    workspaceId: string;
    workspaceName: string;
    logoUrl?: string;
    template?: TemplateWorkspace;
    generators: Generator[];
}

const workspaceDataSchema = Joi.object<WorkspaceFormData>({
    tenantId: Joi.string().required(),
    workspaceId: Joi.string().optional(),
    workspaceName: Joi.string().required(),
    logoUrl: Joi.string().optional().allow(null, ""),
    template: Joi.object<TemplateWorkspace>().optional().allow(null, ""),
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
}).external(async (value, helpers) => {
    const existingWs = await workspaceService.getWorkspaceByTenantAndName(
        value.tenantId as string,
        value.workspaceName
    );
    if (existingWs) {
        throw new Error("workspaceId already exists in this organisation");
    }

    return value;
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

    if (req.method === "POST") {
        const {body} = req;

        let error;
        try {
            body.tenantId = organisation.tenantId;
            await workspaceDataSchema.validateAsync(body);
        } catch (err) {
            error = err;
        }

        if (error) {
            res.status(400).json({error: error.toString()});
            return;
        }

        body.tenantId = organisation.tenantId;
        const newWorkspace = await workspaceService.createWorkspace(
            organisation.tenantId,
            body,
            clerkUserId,
            role
        );
        res.status(201).json(newWorkspace);
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
