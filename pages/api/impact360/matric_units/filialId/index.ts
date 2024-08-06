import prisma from "@/lib/prisma";
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
            let baseQuery = `SELECT * FROM metric_units 
        `;
            const {filialId} = req.query;
            if (req.query.filialId) {
                // baseQuery = `${baseQuery} where fl.id="${filialId}"`;
            } else {
                // metricUnits = await prisma.metric_units.findMany();
            }
            const metricUnits: any = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json(metricUnits);
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
