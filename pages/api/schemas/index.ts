import {createSchema, getAllSchemas} from "lib/api/schema";
import type {NextApiRequest, NextApiResponse} from "next";
import {withApiProtect} from "@/lib/services/auth";
import {getAuth} from "@clerk/nextjs/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            const results = await getAllSchemas();
            return res.status(200).json(results);
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const {schema} = req.body;
            const results = await createSchema(schema);
            return res.status(201).json(results);
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