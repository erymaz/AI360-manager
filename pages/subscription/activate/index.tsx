import {withRequiredAuthentication} from "@/lib/services/auth";
import * as stripeService from "@/lib/services/stripe";
import {GetServerSidePropsContext} from "next";
import {getAuth} from "@clerk/nextjs/server";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx: GetServerSidePropsContext, {organisation}) => {
        const generatorName = ctx.query["generatorName"] as string;
        const workspaceId = ctx.query["workspaceId"] as string;
        const priceId = ctx.query["priceId"] as string;

        const {userId} = getAuth(ctx.req);

        if (!userId) {
            return {
                redirect: {
                    destination: "/sign-up",
                    permanent: false,
                },
            };
        }

        const stripeCustomerId = await stripeService.getOrCreateStripeCustomerId(
            organisation
        );

        const stripeCheckoutSession = await stripeService.createCheckoutSession(
            stripeCustomerId,
            generatorName,
            organisation.tenantId,
            workspaceId,
            priceId
        );

        return {
            redirect: {
                destination: stripeCheckoutSession.url!,
                permanent: false,
            },
        };
    },
    {requireOwner: true}
);

function ActivateSubscription() {
    return null;
}

export default ActivateSubscription;
