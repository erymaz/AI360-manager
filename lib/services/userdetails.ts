import {clerkClient} from "@clerk/clerk-sdk-node";

const waipifyMasterUserEmail = "oscar@waipify.com";

export async function getWaipifyMasterUserID(): Promise<string | undefined> {
    const users = await clerkClient.users.getUserList({emailAddress: [waipifyMasterUserEmail]});
    return users.data.length > 0 ? users.data[0].id : undefined;
}
