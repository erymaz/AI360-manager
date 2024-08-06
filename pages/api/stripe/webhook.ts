import {
  extractWebhookEvent,
  cancelSubscription,
  getProduct,
  getSubscriptionsForCustomer
} from "@/lib/services/stripe";
import { updateSubscriptionStatus, updateSubscriptionPlan } from "@/lib/services/subscription";
import { NextApiRequest, NextApiResponse } from "next";
import { SubscriptionStatus } from "@/lib/models/subscription.model";

export const config = {
  api: {
    // Body parse has to be disabled so that we can access raw body
    // to compute verification checksum and confirm this is legit request
    // from Stripe
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const requestBodyBuffer: Buffer = Buffer.from(req.read());
      const requestSignature = req.headers["stripe-signature"] as string;
      const stripeEvent = await extractWebhookEvent(
        requestBodyBuffer,
        requestSignature!
      );

      const eventData = stripeEvent.data.object as any;
      if (stripeEvent.type.startsWith("invoice.payment_succeeded")) {
        await updateSubscriptionStatus(
          eventData["customer"],
          SubscriptionStatus.ACTIVE,
          new Date()
        );
      } else if (stripeEvent.type.startsWith("invoice.payment_failed")) {
        await updateSubscriptionStatus(
          eventData["customer"],
          SubscriptionStatus.INCOMPLETE,
          new Date()
        );
      } else if (stripeEvent.type.startsWith("customer.subscription.created")) {
        const productId = eventData['plan']['product'];
        const product = await getProduct(productId);
        if (product) {
          await updateSubscriptionPlan(
            eventData["customer"],
            product.name,
          );
        }

        const subscriptions = await getSubscriptionsForCustomer(eventData['customer'] as string);
        // cancel existing subscriptions
        if (subscriptions.length > 1) {
          const queries = [];
          for (let i=1; i<subscriptions.length; i++) {
            queries.push(cancelSubscription(subscriptions[i].id));
          }
          await Promise.all(queries);
        }
      }
      res.status(200).json([]);
    } catch (e: any) {
      res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
