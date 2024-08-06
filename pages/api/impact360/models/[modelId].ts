import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const modelSchema = Joi.object({
    name: Joi.string(),
    provider_id: Joi.string(),
    description: Joi.string(),
    main_capability_name: Joi.string(),
    has_text_generation: Joi.boolean(),
    has_function_calling: Joi.boolean(),
    has_embeddings: Joi.boolean(),
    has_fine_tunnings: Joi.boolean(),
    has_image_generation: Joi.boolean(),
    has_vision: Joi.boolean(),
    has_text_to_speech: Joi.boolean(),
    has_speech_to_text: Joi.boolean(),
    has_moderation: Joi.boolean(),
    version: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {modelId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.models.findFirstOrThrow({
                where: {id: String(modelId)},
            });
            const data = req.body;
            await modelSchema.validateAsync(data);
            if (req.body.provider_id) {
                await prisma.providers.findFirstOrThrow({
                    where: {id: String(req.body.provider_id)},
                });
            }

            const model = await prisma.models.update({
                where: {id: String(modelId)},
                data: req.body,
            });

            return res.status(201).json({model});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.models.findFirstOrThrow({
                where: {id: String(modelId)},
            });
            const model = await prisma.models.delete({
                where: {id: String(modelId)},
            });
            return res
                .status(200)
                .json({model, message: "Model deleted successfully"});
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
