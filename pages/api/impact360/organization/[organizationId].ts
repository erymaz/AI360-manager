import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const organizationSchema = Joi.object({
    name: Joi.string(),
    industry_id: Joi.string(),
    locale_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {organizationId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            const data = req.body;
            await organizationSchema.validateAsync(data);
            if (req.body.locale_id) {
                await prisma.locale.findFirstOrThrow({
                    where: {id: req.body.locale_id},
                });
            }
            if (req.body.industry_id) {
                await prisma.industries.findFirstOrThrow({
                    where: {id: req.body.industry_id},
                });
            }

            const organization = await prisma.organizations.update({
                where: {id: String(organizationId)},
                data: req.body,
            });

            return res.status(201).json({organization});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            const organization = await prisma.organizations.delete({
                where: {id: String(organizationId)},
            });
            return res
                .status(200)
                .json({organization, message: "Organization deleted successfully"});
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
