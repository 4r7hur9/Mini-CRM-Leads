/**
 * Cliente Prisma compartilhado.
 *
 * Responsavel por instancia compartilhada do PrismaClient.
 *
 * Disponibiliza o PrismaClient compartilhado para a camada de dados.
 */
import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
