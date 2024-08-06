import {NextApiRequest, NextApiResponse} from 'next';
import {clerkClient} from '@clerk/nextjs/server';
import { Role } from "@/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId, organisationName} = req.body;

    if (!userId) {
        return res.status(400).json({error: 'User ID is required'});
    }

    try {
        // Create an organization
        const organization = await clerkClient.organizations.createOrganization({
            name: organisationName,
            createdBy: userId,
        });

        // Assign the organization to the user
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                organizationId: organization.id,
                organizationName: organization.name,
                organizationRole: Role.OWNER,
            },
        });

        res.status(200).json({organization});
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export default handler;