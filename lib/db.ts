 // Сгенерированный по schema.prisma клиент — типизированный доступ к базе
// (методы вроде prisma.user.findMany и т.п.).
import { PrismaClient } from "@/lib/generated/prisma/client";
// PrismaPg — driver adapter для Postgres: переходник между Prisma Client и pg.
import { PrismaPg } from "@prisma/adapter-pg";
// node-postgres (пакет "pg") — драйвер Postgres для Node.js. Драйвер — библиотека,
// которая говорит с базой по её протоколу. Сама открывает TCP-соединение.
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
