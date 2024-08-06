import type {NextApiRequest, NextApiResponse} from "next";
import NextCors from "nextjs-cors";
import {editGeneration} from "@/lib/api/generation";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import {getAuth} from "@clerk/nextjs/server";

async function handler(req: NextApiRequest, res: NextApiResponse, {organisation}: AuthData) {
    const {generationId} = req.query;

    const text = req.body;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }


    if (req.method == "PUT") {
        try {
            await editGeneration(generationId as string, organisation.tenantId, text);
            return res.status(200).end();
        } catch (err) {
            console.log(err);
            return res.status(500).end();
        }
    } else {
        return res.status(405).send({message: "Only PUT requests allowed"});
    }
}

export default async function apiHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    return withApiProtect(handler)(req, res);
}
