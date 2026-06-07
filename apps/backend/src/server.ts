import { env } from "./config/env";
import { prisma } from "./config/database";
import { app } from "./app";

const server = app.listen(env.PORT, () => {
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
