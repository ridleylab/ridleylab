import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
    pool?: Pool;
};

const connectionString = process.env.DATABASE_URL!;

const pool = globalForPrisma.pool ?? new Pool({
    connectionString,
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}