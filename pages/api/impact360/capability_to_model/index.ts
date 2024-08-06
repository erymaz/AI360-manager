import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const capabilityToModelSchema = Joi.object({
    model_id: Joi.string().required(),
    capability_id: Joi.string().required(),
    description: Joi.string().required(),
    organization_id: Joi.string().required(),
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
            let capability_to_model = [];
            if (req.query.id) {
                capability_to_model = await prisma.capability_to_model.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else if (req.query.limit && req.query.skip) {
                capability_to_model = await prisma.capability_to_model.findMany({
                    skip: Number(req.query.skip),
                    take: Number(req.query.limit),
                });
            } else {
                capability_to_model = await prisma.capability_to_model.findMany();
            }
            return res.status(200).json({capability_to_model});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await capabilityToModelSchema.validateAsync(data);
            await prisma.models.findFirstOrThrow({
                where: {id: req.body.model_id},
            });
            await prisma.capabilities.findFirstOrThrow({
                where: {id: req.body.capability_id},
            });
            const {organization_id, ...payload} = data;
            const organization = await prisma.organizations.findFirstOrThrow({
                where: {id: req.body.organization_id},
            });
            const capability_to_model = await prisma.capability_to_model.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    organization_creator_id: organization.creator_id,
                    has_user_friendly_ui: false,
                    has_apis: false,
                    has_grpc: false,
                    has_extension: false,
                    ...payload,
                },
            });
            return res.status(201).json({capability_to_model});
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
