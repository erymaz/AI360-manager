import clientPromise from "@/lib/mongodb";
import moment from "moment-timezone";
import { InsertOneResult, ObjectId } from "mongodb";

export type BillingCycle = {
  _id: ObjectId;
  startsAt: Date;
  endsAt: Date;
  currentUsageAmount: number;
  tenantId: string;
};

const BUSINESS_TIME_ZONE = "Europe/Berlin";

export async function getOrCreateBillingCycle(
  tenantId: string,
  date: Date
): Promise<BillingCycle> {
  const startsAt = moment(date)
    .tz(BUSINESS_TIME_ZONE)
    .startOf("month")
    .toDate();
  const endsAt = moment(date)
    .tz(BUSINESS_TIME_ZONE)
    .startOf("month")
    .add(1, "month")
    .toDate();

  const client = await clientPromise;
  const collection = client.db("api").collection("billingcycle");

  const existingBillingCycle = await collection.findOne(
    {
      tenantId: tenantId,
      startsAt: {
        $lte: date,
      },
      endsAt: {
        $gt: date,
      },
    },
    {
      projection: {
        _id: 1,
        startsAt: 1,
        endsAt: 1,
        currentUsageAmount: 1,
        tenantId: 1,
      },
    }
  );

  if (existingBillingCycle) {
    return existingBillingCycle;
  }
  const newBillingCycle = {
    tenantId,
    startsAt: startsAt,
    endsAt: endsAt,
    currentUsageAmount: 0,
  };
  const savedBillingCycle: InsertOneResult = await collection.insertOne(
    newBillingCycle
  );
  if (!savedBillingCycle || !savedBillingCycle.acknowledged) {
    throw new Error("Failed creating new Billing Cycle");
  }
  return { ...newBillingCycle, _id: savedBillingCycle.insertedId };
}

export async function increaseBillingCycleUsage(
  tenantId: string,
  billingCycleId: ObjectId,
  amount: number
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("billingcycle");
  const updatedBillingCycle = await collection.updateOne(
    {
      tenantId: tenantId,
      _id: billingCycleId,
    },
    {
      $inc: { currentUsageAmount: amount },
    }
  );

  if (!updatedBillingCycle.acknowledged) {
    throw new Error("Failed updating Billing Cycle");
  }
}
