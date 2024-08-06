// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getNewUUID = (): string => {
  return uuidv4() as string;
};

export const getNewId = async (tableName: string): Promise<number> => {
  try {
    const result = await prisma.$queryRawUnsafe(
      `SELECT MAX(id) as maxId FROM ${tableName}`
    );
    if (Array.isArray(result) && result.length) {
      const maxId = result[0].maxId;
      return Number(maxId) + 1 || 1;
    } else {
      return 1;
    }
  } catch (error) {
    console.error(`Error fetching last used ID from ${tableName}:`, error);
    return 1;
  }
};

export default prisma;
