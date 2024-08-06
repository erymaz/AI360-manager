import {withRequiredAuthentication} from "@/lib/services/auth";
import * as stripeService from "@/lib/services/stripe";
import {getAuth} from "@clerk/nextjs/server";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation}) => {
        const {tenantId} = organisation;
        const stripeSessionId = ctx.query["sessionId"] as string;
        const stripeSession = await stripeService.retrieveCheckoutSession(
            stripeSessionId!
        );

        const {userId} = getAuth(ctx.req);

        if (!userId) {
            return {
                redirect: {
                    destination: "/sign-up",
                    permanent: false,
                },
            };
        }


        if (stripeSession.metadata!["tenantId"] !== tenantId) {
            throw new Error("Session id is not valid");
        }

        const subscriptionCompleted = stripeSession.status === "complete";
        // if (subscriptionCompleted) {
        //   await subscriptionService.updateSubscriptionStatus(
        //     tenantId,
        //     SubscriptionStatus.ACTIVE,
        //     new Date()
        //   );
        // }

        const gn = encodeURIComponent(stripeSession.metadata!["generatorName"]);
        const wsid = encodeURIComponent(stripeSession.metadata!["workspaceId"]);
        return {
            redirect: {
                destination: `/generator/${gn}?workspaceId=${wsid}&subscriptionComplete=${subscriptionCompleted}`,
                permanent: false,
            },
        };
    },
    {requireOwner: true}
);

function CompleteSubscription() {
    return null;
}

export default CompleteSubscription;
