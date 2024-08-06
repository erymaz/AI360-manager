import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const metricSchema = Joi.object({
    name: Joi.string().required(),
    metric_unit: Joi.string().required(),
    country_id: Joi.string().required(),
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
            let metricUnits = [];
            if (req.query.id) {
                metricUnits = await prisma.metric_units.findMany({
                    where: {
                        id: String(req.query.id),
                    },
                });
            } else {
                metricUnits = await prisma.metric_units.findMany();
            }
            return res.status(200).json({metricUnits});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            await metricSchema.validateAsync(data);
            await prisma.country.findFirstOrThrow({
                where: {id: req.body.country_id},
            });
            const metricUnit = await prisma.metric_units.create({
                data: {
                    id: getNewUUID(),
                    created_at: new Date().toISOString(),
                    ...req.body,
                },
            });
            return res.status(201).json({metricUnit});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const metricUnit = await prisma.metric_units.deleteMany();
            return res.status(201).json({metricUnit});
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
