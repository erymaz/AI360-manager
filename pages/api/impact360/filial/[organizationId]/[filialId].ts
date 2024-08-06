import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const filialSchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    address_number: Joi.string(),
    zip_code: Joi.string(),
    country_id: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {organizationId, filialId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.organizations.findFirstOrThrow({
                where: {id: String(organizationId)},
            });
            await prisma.filials.findFirstOrThrow({
                where: {id: String(filialId)},
            });
            const data = req.body;
            await filialSchema.validateAsync(data);

            const filial = await prisma.filials.update({
                where: {id: String(filialId)},
                data: req.body,
            });

            return res.status(201).json({filial});
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
            await prisma.filials.findFirstOrThrow({
                where: {id: String(filialId)},
            });
            const filial = await prisma.filials.delete({
                where: {id: String(filialId)},
            });
            return res
                .status(200)
                .json({filial, message: "Filial deleted successfully"});
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
