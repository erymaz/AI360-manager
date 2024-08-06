import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function getAllSchemas(): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("schemas");
  return await collection
    .aggregate([
      {
        $limit: 100,
      },
    ])
    .toArray();
}

export async function getSchema(_id: string): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("schemas");
  const result = await collection.findOne({ _id: new ObjectId(_id) });
  if (result) {
    return result;
  } else {
    return null;
  }
}

export async function createSchema(schemaObj: any): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("schemas");
  return await collection.insertOne(schemaObj);
}

export async function deleteSchema(_id: string): Promise<any> {
  const client = await clientPromise;
  const collection = client.db("api").collection("schemas");
  return await collection.deleteOne({ _id: new ObjectId(_id) });
}
