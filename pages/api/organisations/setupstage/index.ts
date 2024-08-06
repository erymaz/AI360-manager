import {NextApiRequest, NextApiResponse} from "next";
import {getAuth, clerkClient} from "@clerk/nextjs/server";
import * as organisationService from "@/lib/services/organisation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {userId} = getAuth(req);

        if (!userId) {
            return res.status(401).json({error: "User must be logged in"});
        }

        const user = await clerkClient.users.getUser(userId);

        if (req.method === "GET") {
            const organizationId = user?.publicMetadata?.organizationId;

            if (!organizationId || typeof (organizationId) !== "string") {
                return res.status(400).json({error: "Organization ID not found"});
            }

            const setupIndex = await organisationService.getOrganisationOnboardingStepIndex(organizationId);
            return res.status(200).json(setupIndex);
        }

        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({error: `Method ${req.method} Not Allowed`});
    } catch (e: any) {
        console.error(e); // Log the error for debugging
        return res.status(500).json({error: e.message});
    }
}