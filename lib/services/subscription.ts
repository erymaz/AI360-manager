import * as organisationRepository from "@/lib/api/organisation";
import {
  SubscriptionInfo,
  SubscriptionStatus,
} from "@/lib/models/subscription.model";

export async function getSubscriptionInfo(
  tenantId: string,
): Promise<SubscriptionInfo> {
  const org = await organisationRepository.findOrganisation(tenantId);

  if (org.subscriptionStatus) {
    return { status: org.subscriptionStatus };
  }

  return { status: SubscriptionStatus.INCOMPLETE };
}

export async function updateSubscriptionPlan(
  customer: string,
  plan: string,
): Promise<void> {
  await organisationRepository.updateSubscriptionPlan(
    customer,
    plan,
  );
}

export async function updateSubscriptionStatus(
  customer: string,
  subscriptionStatus: SubscriptionStatus,
  subscriptionActivatedAt: Date
): Promise<void> {
  await organisationRepository.updateSubscriptionStatus(
    customer,
    subscriptionStatus,
    subscriptionActivatedAt
  );
}
