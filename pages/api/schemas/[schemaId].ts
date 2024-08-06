import {deleteSchema, getSchema} from "lib/api/schema";
import type {NextApiRequest, NextApiResponse} from "next";
import {withApiProtect} from "@/lib/services/auth";
import {getAuth} from "@clerk/nextjs/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {schemaId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            const result = await getSchema(schemaId as string);

            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).end();
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const result = await deleteSchema(schemaId as string);
            return res.status(204).end();
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
