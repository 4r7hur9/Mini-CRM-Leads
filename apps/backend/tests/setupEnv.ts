import dotenv from "dotenv";

dotenv.config({ path: ".env.test", override: false });

process.env.NODE_ENV = "test";
process.env.PORT = process.env.PORT ?? "3002";
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:3000";
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "test_jwt_secret_minimum_32_chars_123456789";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://arthur:3326@localhost:5434/mini_crm_leads_test?schema=public";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl.includes("_test")) {
  throw new Error(
    "DATABASE_URL de teste deve apontar para um banco isolado com sufixo _test.",
  );
}
