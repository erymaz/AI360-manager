import * as organisation from "@/lib/api/organisation";
import { Organisation } from "@/lib/api/organisation";
import Stripe from "stripe";

import { Plan } from "../models/subscription.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const WEBHOOK_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SIGHNING_SECRET as string;

export async function getOrCreateStripeCustomerId(
  org: Organisation
): Promise<string> {
  if (org.stripeId) {
    return org.stripeId;
  }
  const stripeCustomer = await stripe.customers.create({
    email: org.email,
    name: org.companyName,
    metadata: {
      tenantId: org.tenantId,
    },
  });
  await organisation.updateStripeCustomerId(org.tenantId, stripeCustomer.id);

  return stripeCustomer.id;
}

export async function createCheckoutSession(
  stripeId: string,
  generatorName: string,
  tenantId: string,
  workspaceId: string,
  priceId: string,
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/complete?sessionId={CHECKOUT_SESSION_ID}`,
    mode: "subscription",
    customer: stripeId,
    payment_method_types: ["card"],
    metadata: {
      generatorName,
      tenantId,
      workspaceId,
    },
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
  });
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function extractWebhookEvent(
  requestBody: string | Buffer,
  signature: string | Buffer | Array<string>
): Promise<Stripe.Event> {
  return stripe.webhooks.constructEvent(
    requestBody,
    signature,
    WEBHOOK_SIGNING_SECRET
  );
}

export async function getPricingModels(): Promise<Plan[]> {
  const [products, prices] = await Promise.all([
    stripe.products.list({
      active: true,
    }),
    stripe.prices.list({
      active: true,
    })
  ]);

  const plans: Plan[] = [];
  for (const product of products.data) {
    const _prices = prices.data.filter(price => price.product === product.id);
    const defaultPrice = _prices.find(_ => _.id === product.default_price);
    plans.push({
      id: product.id,
      name: product.name,
      price: defaultPrice?.unit_amount ?? _prices[0]?.unit_amount ?? 0,
      features: (product as any).features,
      prices: _prices.map(_ => ({
        id: _.id,
        unit_amount: _.unit_amount || 0,
        product: _.product as string,
        recurring: _.recurring || {},
      })),
    });
  };

  return plans;
}

export async function getSubscriptionsForCustomer(
  customer: string
): Promise<Stripe.Subscription[]> {
  const subscriptions = await stripe.subscriptions.list({
    customer,
  });
  return subscriptions.data;
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export async function getProduct(
  productId: string
): Promise<Stripe.Product> {
  return await stripe.products.retrieve(productId);
}
