import { BillingInfo, Industry } from "@/lib/models/organisation-details.model";
import clientPromise from "@/lib/mongodb";
import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "../models/subscription.model";
import {User} from "@clerk/backend";

export const DELETED_PREFIX = "deleted_";

export type DeletionResult = {
  deactivated: string[];
  notDeactivated: string[];
  notCancelledInvitations: string[];
};

export type Organisation = {
  companyName: string;
  email: string;
  companyWebsite?: string;
  termsAgreement: boolean;
  organisationId: string;
  tenantId: string;
  subscriptionActivatedAt: Date;
  stripeId: string;
  blockedAt?: number;
  billingInfo?: BillingInfo;
  industry?: Industry;
  country?: string;
  plan?: string;
  subscriptionStatus?: SubscriptionStatus;
};

type OrganisationDetails = Pick<
  Organisation,
  "companyName" | "companyWebsite" | "country" | "billingInfo" | "industry"
>;

export async function createOrganisation(
  user: User,
  configObj: any
): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  configObj.email = user.emailAddresses[0].emailAddress;
  configObj.tenantId = user?.publicMetadata?.organizationId;

  const newOrganisation = await collection.insertOne(configObj);
  if (!newOrganisation.acknowledged) {
    throw new Error("Error saving organisation");
  }
}

export async function updateStripeCustomerId(
  tenantId: string,
  stripeCustomerId: string
): Promise<void> {
  const updateObj = {
    $set: {
      stripeId: stripeCustomerId,
    },
  };
  await updateOrganisation(tenantId, updateObj);
}

export async function updateSubscriptionPlan(
  customer: string,
  plan: string,
): Promise<void> {
  const updateObj = {
    $set: {
      plan,
    },
  };
  await updateOrganisationWithStriipeId(customer, updateObj);
}

export async function updateSubscriptionStatus(
  customer: string,
  subscriptionStatus: SubscriptionStatus,
  subscriptionActivatedAt: Date
): Promise<void> {
  const updateObj = {
    $set: {
      subscriptionStatus,
      subscriptionActivatedAt: subscriptionActivatedAt,
    },
  };
  await updateOrganisationWithStriipeId(customer, updateObj);
}

export async function updateOrganisationDetails(
  tenantId: string,
  organisationDetails: OrganisationDetails
) {
  const updateObj = {
    $set: organisationDetails,
  };
  await updateOrganisation(tenantId, updateObj);
}

async function updateOrganisation(
  tenantId: string,
  updateObj: any
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  await collection.updateOne({ tenantId: tenantId, deleted: null }, updateObj);
}

async function updateOrganisationWithStriipeId(
  stripeId: string,
  updateObj: any
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  await collection.updateOne({ stripeId: stripeId, deleted: null }, updateObj);
}

export async function findOrganisation(
  tenantId: string
): Promise<Organisation> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  return collection.findOne(
    { tenantId: tenantId, deleted: null },
    {
      projection: {
        _id: 0,
        companyName: 1,
        email: 1,
        companyWebsite: 1,
        country: 1,
        termsAgreement: 1,
        organisationId: 1,
        tenantId: 1,
        subscriptionActivatedAt: 1,
        stripeId: 1,
        blockedAt: 1,
        plan: 1,
      },
    }
  );
}

export async function findOrganisationDetails(
  tenantId: string
): Promise<Organisation> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  return collection.findOne(
    { tenantId: tenantId, deleted: null },
    {
      projection: {
        _id: 0,
        companyName: 1,
        email: 1,
        companyWebsite: 1,
        tenantId: 1,
        billingInfo: 1,
        industry: 1,
        country: 1,
      },
    }
  );
}

export async function doesOrganisationExist(
  organisationId: string
): Promise<boolean> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  return collection.findOne({ organisationId: organisationId });
}

/**
 * A user registered and completed the create-account->name-workspace->customise-generator flow
 */
export async function isOrganisationSetup(
    tenantId: string
): Promise<number> {
  if (!tenantId) return 0;

  const client = await clientPromise;
  const organisationsCollection = client.db("api").collection("organisations");
  const org = await organisationsCollection.findOne({
    tenantId: tenantId,
  });
  if (!org) {
    return 0;
  }

  const organization = await prisma.organizations.findFirst({
    where: {
      name: String(org.companyName),
    },
  });
  if (!organization) {
    return 1;
  }

  const filials = await prisma.filials.findMany({
    where: {
      organization_id: String(organization.id),
    },
  });
  if (filials.length === 0) {
    return 1;
  }

  return 2;
}

export async function markOrganisationDeleted(tenantId: string): Promise<void> {
  await updateOrganisation(tenantId, {
    $set: {
      organisationId: DELETED_PREFIX + tenantId,
      deleted: true,
    },
  });
}

export async function writeOrganisationDeletionResult(
  tenantId: string,
  deletionResult: DeletionResult
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("organisations");
  await collection.updateOne(
    { tenantId: tenantId, deleted: true },
    { $set: { deletionResult } }
  );
}
