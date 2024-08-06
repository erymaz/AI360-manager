import {withApiProtect} from "@/lib/services/auth";
import {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

export const config = {
    maxDuration: 300,
};

const renderVideo = (videoId: string) => {
    return fetch(`https://apis.elai.io/api/v1/videos/render/${videoId}`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.ELAI_API_KEY}`,
        },
    }).then((res) => res.json());
};

const getVideo = (videoId: string) => {
    return fetch(`https://apis.elai.io/api/v1/videos/${videoId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.ELAI_API_KEY}`,
        },
    }).then((res) => res.json());
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const videoId = req.query.videoId;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (!videoId) {
        res.status(400).json({
            error: "No video id provided",
        });
    }
    const id = videoId as string;
    if (req.method === "GET") {
        try {
            const response = await getVideo(id);
            res.status(200).json({videoId, ...response});
        } catch (e: any) {
            res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const response = await renderVideo(id);
            res.status(200).json({videoId, ...response});
        } catch (e: any) {
            res.status(500).json({
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
