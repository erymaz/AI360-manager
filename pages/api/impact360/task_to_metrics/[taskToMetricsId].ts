import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {taskToMetricsId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "DELETE") {
        try {
            await prisma.task_to_metrics.findFirstOrThrow({
                where: {id: String(taskToMetricsId)},
            });
            const task_to_metric = await prisma.task_to_metrics.delete({
                where: {id: String(taskToMetricsId)},
            });
            return res.status(200).json({
                task_to_metric,
                message: "Task to metrics deleted successfully",
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
