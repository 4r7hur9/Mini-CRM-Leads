/**
 * Bootstrap HTTP do backend.
 *
 * Responsavel por sobe o servidor HTTP e trata shutdown gracioso.
 *
 * Inicializa o HTTP server e controla o shutdown gracioso.
 */
import { app } from "./app";
import { prisma } from "./config/database";
import { env } from "./config/env";

const HOST = "0.0.0.0";

const server = app.listen(env.PORT, HOST, () => {
  console.log(`API running on port ${env.PORT}`);
});

const shutdown = async (signal: NodeJS.Signals) => {
  console.log(`${signal} received. Closing HTTP server...`);

  server.close(async () => {
    await prisma.$disconnect();
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

process.on("uncaughtException", async (error) => {
  console.error("Uncaught exception:", error);
  await prisma.$disconnect();
  process.exit(1);
});
