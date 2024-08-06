import {loadAiGenerators} from "@/generators/listing";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import Joi from "joi";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

interface WorkspaceEditFormData {
    generators: string[];
}

const workspaceEditDataSchema = Joi.object<WorkspaceEditFormData>({
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
    const {
        query: {workspaceId},
    } = req;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (!workspaceId) {
        return res.status(401).end("workspaceId not provided");
    }

    if (req.method === "PUT") {
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
            workspaceId?.toString() as string,
            clerkUserId,
            role
        );
        if (!existingWs) {
            res.status(404).json({error: "workspace does not exist"});
            return;
        }

        if (body.generators) {
            existingWs.generators = body.generators;
        }

        await workspaceService.updateWorkspace(existingWs, clerkUserId, role);

        res.status(200).end();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
