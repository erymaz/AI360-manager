import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const capabilitySchema = Joi.object({
    name: Joi.string(),
    model_id: Joi.string(),
    description: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {capabilityId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.capabilities.findFirstOrThrow({
                where: {id: String(capabilityId)},
            });
            const data = req.body;
            await capabilitySchema.validateAsync(data);
            if (req.body.model_id) {
                await prisma.models.findFirstOrThrow({
                    where: {id: req.body.model_id},
                });
            }

            const capability = await prisma.capabilities.update({
                where: {id: String(capabilityId)},
                data: req.body,
            });

            return res.status(201).json({capability});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.capabilities.findFirstOrThrow({
                where: {id: String(capabilityId)},
            });
            const capability = await prisma.capabilities.delete({
                where: {id: String(capabilityId)},
            });
            return res
                .status(200)
                .json({capability, message: "Capability deleted successfully"});
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
