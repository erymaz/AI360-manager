import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const reportSchema = Joi.object({
    name: Joi.string(),
    preview_url: Joi.string(),
    slug: Joi.string(),
    time_zone: Joi.date(),
    default_currency_code: Joi.string(),
    default_locale: Joi.string(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {filialId, reportId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.filials.findFirstOrThrow({
                where: {id: String(filialId)},
            });
            await prisma.reports.findFirstOrThrow({
                where: {id: String(reportId)},
            });
            const data = req.body;
            await reportSchema.validateAsync(data);

            const report = await prisma.reports.update({
                where: {id: String(reportId)},
                data: req.body,
            });

            return res.status(200).json({report});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.filials.findFirstOrThrow({
                where: {id: String(filialId)},
            });
            await prisma.reports.findFirstOrThrow({
                where: {id: String(reportId)},
            });
            const report = await prisma.reports.delete({
                where: {id: String(reportId)},
            });
            return res
                .status(200)
                .json({report, message: "Report deleted successfully"});
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