import clientPromise from "@/lib/mongodb";
import {BSON, ObjectId} from "mongodb";

type Generation = {
  tenantId: string,
  workspaceId: string,
  generatorName: string,
  userId: string,
  datetime: Date,
  formData: object,
  billingCycleId?: ObjectId,
  result: object[]
};

export async function saveGeneration(generation: Generation): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("generations");
  return await collection.insertOne(generation);
}

export async function editGeneration(generationId: string, tenantId: string, text: string): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("generations");
  const objectId = new BSON.ObjectId(generationId);
  const generation = await collection.findOne({ _id: objectId, tenantId: tenantId });
  if (!generation) throw new Error('could not find generation');
  generation.result = text;
  const replaceResult = await collection.replaceOne({ _id: objectId}, generation);
  return replaceResult;
}

export async function getGenerations(generatorName: string, tenantId: string): Promise<Generation[]> {
  const client = await clientPromise;
  const collection = client.db("api").collection("generations");
  return await collection.find({ generatorName: generatorName, tenantId: tenantId })
    .sort( { "datetime": -1 } )
    .toArray();
}
