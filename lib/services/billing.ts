import * as billingCycleRepository from "@/lib/api/billingcycle";
import { BillingCycle } from "@/lib/api/billingcycle";
import { ObjectId } from "mongodb";

export async function getOrCreateBillingCycle(
  tenantId: string,
  date: Date
): Promise<BillingCycle> {
  return await billingCycleRepository.getOrCreateBillingCycle(tenantId, date);
}

export async function increaseBillingCycleUsage(
  tenantId: string,
  billingCycleId: ObjectId,
  amount: number
): Promise<void> {
  await billingCycleRepository.increaseBillingCycleUsage(
    tenantId,
    billingCycleId,
    amount
  );
}
