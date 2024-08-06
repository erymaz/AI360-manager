import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const solutionSchema = Joi.object({
    name: Joi.string().required(),
    provider_id: Joi.string().required(),
    description: Joi.string().allow(null).allow(""),
    organization_creator_id: Joi.string().required(),
    model_id: Joi.string().allow(null).allow(""),
    has_api: Joi.boolean().allow(null).allow(""),
    has_user_friendly_ui: Joi.boolean().allow(null).allow(""),
    has_grpc: Joi.boolean().allow(null).allow(""),
    has_extension: Joi.boolean().allow(null).allow(""),
    is_platform: Joi.boolean().allow(null).allow(""),
    is_available: Joi.boolean().allow(null).allow(""),
    has_incumbent_integration: Joi.boolean().allow(null).allow(""),
    documentation_url: Joi.boolean().allow(null).allow(""),
    features: Joi.boolean().allow(null).allow(""),
    benefits: Joi.boolean().allow(null).allow(""),
    version: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {solutionId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.solutions.findFirstOrThrow({
                where: {id: String(solutionId)},
            });            

            if (req.body.provider_id) {
                await prisma.providers.findFirstOrThrow({
                    where: {id: String(req.body.provider_id)},
                });
            }
            if (req.body.model_id) {
                await prisma.models.findFirstOrThrow({
                    where: {id: String(req.body.model_id)},
                });
            }

            const solution = await prisma.solutions.update({
                where: {id: String(solutionId)},
                data: req.body,
            });

            return res.status(201).json({solution});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.solutions.findFirstOrThrow({
                where: {id: String(solutionId)},
            });
            const solution = await prisma.solutions.delete({
                where: {id: String(solutionId)},
            });
            return res
                .status(200)
                .json({solution, message: "Solution deleted successfully"});
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
