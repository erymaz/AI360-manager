import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const capabilityToModelSchema = Joi.object({
    model_id: Joi.string(),
    capability_id: Joi.string(),
    description: Joi.string(),
    has_user_friendly_ui: Joi.boolean(),
    has_apis: Joi.boolean(),
    has_grpc: Joi.boolean(),
    has_extension: Joi.boolean(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {capabilityToModelId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.capability_to_model.findFirstOrThrow({
                where: {id: String(capabilityToModelId)},
            });
            const data = req.body;
            await capabilityToModelSchema.validateAsync(data);
            if (req.body.model_id) {
                await prisma.models.findFirstOrThrow({
                    where: {id: req.body.model_id},
                });
            }
            if (req.body.capability_id) {
                await prisma.capabilities.findFirstOrThrow({
                    where: {id: req.body.capability_id},
                });
            }

            const capability_to_model = await prisma.capability_to_model.update({
                where: {id: String(capabilityToModelId)},
                data: req.body,
            });

            return res.status(201).json({capability_to_model});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.capability_to_model.findFirstOrThrow({
                where: {id: String(capabilityToModelId)},
            });
            const capability_to_model = await prisma.capability_to_model.delete({
                where: {id: String(capabilityToModelId)},
            });
            return res
                .status(200)
                .json({
                    capability_to_model,
                    message: "Capability to model deleted successfully",
                });
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
