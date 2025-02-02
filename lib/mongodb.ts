import { MongoClient } from "mongodb";
const promiseRetry = require('promise-retry');


const uri = process.env.MONGODB_URI as string;
const options = {
  useUnifiedTopology: false,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  heartbeatFrequencyMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<any>;

declare global {
  var _mongoClientPromise: Promise<any>;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);

  clientPromise = promiseRetry((retry: any, number: Number)=>{
    console.log('attempt number', number);
    return client.connect().catch(retry)
  })
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Close the MongoDB connection when the application is terminated
process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, closing MongoDB connection");
  await client.close();
});
