import {NextApiRequest, NextApiResponse} from 'next';
import {AuthData, withApiProtect} from "@/lib/services/auth";
import {clerkClient, getAuth} from "@clerk/nextjs/server";

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
            const user = await clerkClient.users.getUser(userId);

            const organisationId = user.publicMetadata.organizationId;

            if (!organisationId) {
                return res.status(400).json({error: "Organisation ID not found for the users"});
            }

            let results: any[] = [];

            const invites = await clerkClient.invitations.getInvitationList();
            const users = await clerkClient.users.getUserList()

            results.push(...invites.data.filter((i) => i?.publicMetadata?.organizationId === organisationId))
            results.push(...users.data.filter((i) => i?.publicMetadata?.organizationId === organisationId))


            res.status(200).json(results);
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