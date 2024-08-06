import clientPromise from "@/lib/mongodb";
import { Pagination, WorkspaceRole } from "@/types";
import { ObjectId } from "mongodb";

export type UserWorkspace = {
  _id: ObjectId;
  workspaceId: ObjectId;
  tenantId: string;
  userId: string | null;
  email: string;
  role: WorkspaceRole;
};

export async function addUserToWorkspace(
  workspaceId: ObjectId,
  tenantId: string,
  userId: string | null,
  email: string,
  role: WorkspaceRole
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  const newWorkspaceUser = await collection.insertOne({
    workspaceId,
    tenantId,
    userId,
    email,
    role,
  });
  if (!newWorkspaceUser.acknowledged) {
    throw new Error("Error adding user to workspace");
  }
}

export async function removeUserFromWorkspace(
  tenantId: string,
  workspaceId: ObjectId,
  email: string
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  await collection.deleteOne({
    tenantId,
    email,
    workspaceId,
  });
}

export async function removeUsers(tenantId: string): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  await collection.deleteMany({
    tenantId,
  });
}

export async function removeUsersFromWorkspace(
  tenantId: string,
  workspaceId: ObjectId
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  await collection.deleteMany({
    tenantId,
    workspaceId,
  });
}

export async function getWorkspaceUsers(
  tenantId: string,
  workspaceId: ObjectId,
  pagination: Pagination
): Promise<UserWorkspace[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  const offset = pagination.pageNumber * pagination.pageSize;
  return await collection
    .find(
      { tenantId, workspaceId },
      {
        projection: {
          _id: 0,
          workspaceId: 1,
          tenantId: 1,
          userId: 1,
          email: 1,
          role: 1,
        },
      },
      {
        skip: offset,
        limit: pagination.pageSize,
      }
    )
    .toArray();
}

export async function getWorkspaceUsersEmails(
  tenantId: string,
  workspaceId: ObjectId
): Promise<string[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  const emailObjArray: Array<{ email: string }> = await collection
    .find(
      { tenantId, workspaceId },
      {
        projection: {
          _id: 0,
          workspaceId: 0,
          tenantId: 0,
          userId: 0,
          role: 0,
        },
      },
      {
        skip: 0,
        limit: 100,
      }
    )
    .toArray();
  return emailObjArray.map((obj: { email: string }) => obj.email);
}

export async function getUserWorkspaceByWorkspaceAndEmail(
  workspaceId: ObjectId,
  email: string
): Promise<UserWorkspace> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return collection.findOne(
    { email, workspaceId },
    {
      projection: {
        _id: 0,
        workspaceId: 1,
        tenantId: 1,
        userId: 1,
        email: 1,
        role: 1,
      },
    }
  );
}

export async function getUserWorkspaceByTenantAndWorkspaceAndEmail(
  tenantId: string,
  workspaceId: ObjectId,
  email: string
): Promise<UserWorkspace> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return collection.findOne(
    { tenantId, email, workspaceId },
    {
      projection: {
        _id: 1,
        workspaceId: 1,
        tenantId: 1,
        userId: 1,
        email: 1,
        role: 1,
      },
    }
  );
}

export async function getUserWorkspaceByTenantAndWorkspaceAndUserId(
  tenantId: string,
  workspaceId: ObjectId,
  userId: string
): Promise<UserWorkspace> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return collection.findOne(
    { tenantId, userId, workspaceId },
    {
      projection: {
        _id: 0,
        workspaceId: 1,
        tenantId: 1,
        userId: 1,
        email: 1,
        role: 1,
      },
    }
  );
}

export async function getWorkspacesForUser(
  tenantId: string,
  userId: string
): Promise<UserWorkspace[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return await collection
    .find(
      { tenantId, userId },
      {
        projection: {
          _id: 0,
          workspaceId: 1,
          tenantId: 1,
          userId: 1,
          email: 1,
          role: 1,
        },
      }
    )
    .toArray();
}

export async function getUserWorkspacesWithoutUserIdByEmail(
  tenantId: string,
  email: string
): Promise<UserWorkspace[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return await collection
    .find(
      { tenantId, userId: null, email },
      {
        projection: {
          _id: 0,
          workspaceId: 1,
          tenantId: 1,
          userId: 1,
          email: 1,
          role: 1,
        },
      }
    )
    .toArray();
}

export async function updateUserWorkspaceRole(
  _id: ObjectId,
  role: WorkspaceRole
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return collection.updateOne({ _id }, { $set: { role } });
}

export async function addUserIdToUserWorkspaces(
  tenantId: string,
  userId: string,
  email: string
): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("userworkspaces");
  return collection.updateMany({ tenantId, email }, { $set: { userId } });
}
