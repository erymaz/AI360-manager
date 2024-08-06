import { withApiProtect } from "@/lib/services/auth";
import { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";

export const config = {
  maxDuration: 300,
};

interface ParsedResultType {
  output: any;
}

const getImage = async (imageId: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    key: process.env.STABLEDIFFUSION_API_KEY,
  });
  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let parsedResult: ParsedResultType | undefined;
  await fetch(
    `https://stablediffusionapi.com/api/v3/fetch/${imageId}`,
    requestOptions,
  )
    .then(async (response) => {
      parsedResult = await response.json();
    })
    .catch((error) => console.log("error", error));
  const output = parsedResult?.output;
  const imageUrls = Array.isArray(output) ? output : [output];
  if (parsedResult) {
    parsedResult.output = imageUrls;
  }
  return parsedResult;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const imageId = req.query.imageId;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User must be logged in" });
  }

  if (!imageId) {
    res.status(400).json({
      error: "No image id provided",
    });
  }
  const id = imageId as string;
  if (req.method === "GET") {
    try {
      const response = await getImage(id);
      res.status(200).json({ ...response });
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
