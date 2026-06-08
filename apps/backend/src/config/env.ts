import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(10).startsWith("mysql://"),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),
  COOKIE_SECURE: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value ? value === "true" : process.env.NODE_ENV === "production")),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
