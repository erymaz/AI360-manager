import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const modelSchema = Joi.object({
    name: Joi.string().required(),
    provider_id: Joi.string().required(),
    description: Joi.string().required(),
    organization_id: Joi.string().required(),
    main_capability_name: Joi.string().required(),
    has_text_generation: Joi.boolean().required(),
    has_function_calling: Joi.boolean().required(),
    has_embeddings: Joi.boolean().required(),
    has_fine_tunnings: Joi.boolean().required(),
    has_image_generation: Joi.boolean().required(),
    has_vision: Joi.boolean().required(),
    has_text_to_speech: Joi.boolean().required(),
    has_speech_to_text: Joi.boolean().required(),
    has_moderation: Joi.boolean().required(),
    version: Joi.string().allow(null).allow(""),
});

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
            let models = [];
            if (req.query.id) {
                models = await prisma.models.findMany({
                    where: {id: String(req.query.id)},
                });
            } else if (req.query.limit && req.query.skip) {
                models = await prisma.models.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else if (req.query.name) {
                models = await prisma.models.findMany({
                    where: {
                        name: {
                            contains: String(req.query.name),
                        },
                    },
                });
            } else {
                models = await prisma.models.findMany();
            }
            return res.status(200).json({models});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await modelSchema.validateAsync(data);
            const {organization_id, provider_id, ...modelData} = data;
            const organization = await prisma.organizations.findFirstOrThrow({
                where: {id: organization_id},
            });
            await prisma.providers.findFirstOrThrow({
                where: {id: provider_id},
            });

            const model = await prisma.models.create({
                data: {
                    id: getNewUUID(),
                    organization_creator_id: organization.creator_id,
                    provider_id: provider_id,
                    created_at: new Date().toISOString(),
                    ...modelData,
                },
            });
            return res.status(201).json({model});
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
