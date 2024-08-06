import clientPromise from "@/lib/mongodb";
import { WorkspaceGeneratorsDto } from "@/types";
import { BSON, ObjectId } from "mongodb";

export type Workspace = {
  _id: ObjectId;
  tenantId: string;
  workspaceName: string;
  generators: string[];
  logoUrl?: string;
  template?: {
    color: string;
    name: string;
  };
};

export async function createWorkspace(workspace: Workspace): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  const newWorkspace = await collection.insertOne(workspace);
  if (!newWorkspace.acknowledged) {
    throw new Error("Error creating workspace");
  }
  return newWorkspace;
}

export async function getWorkspaceByTenantAndId(
  tenantId: string,
  workspaceId: string
): Promise<Workspace> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return await collection.findOne({
    tenantId: tenantId,
    _id: new BSON.ObjectId(workspaceId),
    deleted: null,
  });
}

export async function getWorkspaceByTenantAndName(
  tenantId: string,
  workspaceName: string
): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return await collection.findOne({
    tenantId: tenantId,
    workspaceName: workspaceName,
    deleted: null,
  });
}

export async function getAllWorkspaces(tenantId: string): Promise<Workspace[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return await collection
    .find(
      { tenantId: tenantId, deleted: null },
      {
        projection: {
          _id: 1,
          tenantId: 1,
          workspaceName: 1,
          generators: 1,
          logoUrl: 1,
          template: 1,
        },
      }
    )
    .toArray();
}

export async function getWorkspaceGenerators(
  tenantId: string,
  workspaceId: ObjectId
): Promise<WorkspaceGeneratorsDto> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return await collection.findOne(
    { tenantId: tenantId, _id: workspaceId, deleted: null },
    { projection: { _id: 0, generators: 1 } }
  );
}

export async function updateWorkspace(workspace: any) {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return collection.replaceOne(
    { tenantId: workspace.tenantId, _id: new BSON.ObjectId(workspace.id) },
    workspace
  );
}

export async function markDeletedByTenantId(tenantId: string) {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return collection.updateMany({ tenantId }, { $set: { deleted: true } });
}

export async function markDeleted(_id: ObjectId): Promise<void> {
  const client = await clientPromise;
  const collection = client.db("api").collection("workspaces");
  return collection.updateOne({ _id }, { $set: { deleted: true } });
}
