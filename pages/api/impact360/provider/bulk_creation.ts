import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import type {NextApiRequest, NextApiResponse} from "next";
import {getWaipifyMasterUserID} from "@/lib/services/userdetails";
import {getAuth} from "@clerk/nextjs/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "POST") {
        try {
            const data: Record<string, string>[] = req.body;
            if (!data.length) {
                return res.status(400).end(`Empty data`);
            }

            const [masterUserId, countries] = await Promise.all([
                getWaipifyMasterUserID(),
                prisma.country.findMany()
            ]);
            if (!masterUserId) {
                return res.status(500).end(`Can't find master`);
            }

            const inputData: any[] = [];
            const names = [];
            for (const dt of data) {
                names.push(dt.name)
                const country = countries.find(_ => _.iso2 === dt['headquarters_country_id']);
                inputData.push({
                    id: getNewUUID(),
                    ...dt,
                    organzation_creator_id: masterUserId,
                    headquarters_country_id: country?.id || null,
                });
            }

            // Check if exists providers that have same name.
            const providers = await prisma.providers.findMany({
                where: {
                    name: {
                        in: names
                    },
                },
            });
            if (providers.length) {
                const errorNames = providers.map(_ => _.name);
                console.log("duplicated", errorNames)
                // return res.status(400).json({
                //   error: `Providers that have same name exist: ${errorNames.join(', ')}`
                // });
            }

            await prisma.providers.createMany({
                data: inputData,
                skipDuplicates: true,
            });
            return res.status(201).json({
                success: true
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
