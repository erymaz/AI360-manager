import {getGenerations, saveGeneration} from "@/lib/api/generation";
import {
    isSubscriptionValid,
} from "@/lib/models/subscription.model";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import * as billingService from "@/lib/services/billing";
import * as subscriptionService from "@/lib/services/subscription";
import {ObjectId} from "mongodb";
import type {NextApiRequest, NextApiResponse} from "next";
import NextCors from "nextjs-cors";
import {getAuth} from "@clerk/nextjs/server";

export const config = {
    maxDuration: 300,
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    {organisation, clerkUserId}: AuthData
) {

    const {name, workspaceId} = req.query;
    const {tenantId} = organisation;


    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }


    // Import and respond with the generated response
    // Return 404 if there is no schema
    const formData = req.body;

    if (req.method == "GET") {
        const generationHistory = await getGenerations(name as string, tenantId);
        return res.status(200).json({generations: generationHistory});
    } else if (req.method == "POST") {
        try {
            const generationDate = new Date();
            const subscriptionInfo = await subscriptionService.getSubscriptionInfo(
                tenantId,
            );
            if (!isSubscriptionValid(subscriptionInfo)) {
                return res.status(400).send({message: "Subscription is inactive"});
            }

            const {run, metaData} = await import(`@/generators/${name}/main`);
            const cost = metaData().cost_per_use;
            const data = await run(formData);

            let billingCycleId: ObjectId | undefined;

            const billingCycle = await billingService.getOrCreateBillingCycle(
                tenantId,
                generationDate
            );
            await billingService.increaseBillingCycleUsage(
                tenantId,
                billingCycle._id,
                cost
            );
            billingCycleId = billingCycle._id;

            const saved = await saveGeneration({
                tenantId: tenantId,
                userId: clerkUserId,
                formData: formData,
                generatorName: name as string,
                result: data,
                datetime: generationDate,
                billingCycleId: billingCycleId,
                workspaceId: workspaceId!.toString(),
            });

            return res.status(200).json({
                generationId: saved.insertedId.toString(),
                data: data
            });
        } catch (err) {
            console.log(err);
            // If the import fails (e.g., the file does not exist)
            if ((err as { code: string }).code === "ERR_MODULE_NOT_FOUND") {
                return res
                    .status(404)
                    .send({message: `Generator "${name}" not found`});
            } else {
                // Handle other errors
                return res.status(500).json({error: err});
            }
        }
    } else {
        return res.status(405).send({message: "Only GET/POST requests allowed"});
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
