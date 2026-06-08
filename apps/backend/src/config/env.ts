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
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_GENERAL_MAX: z.coerce.number().int().positive().default(300),
  RATE_LIMIT_AUTH_MAX: z.coerce.number().int().positive().default(10),
  RATE_LIMIT_E2E_BYPASS_ENABLED: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
  RATE_LIMIT_E2E_BYPASS_KEY: z.string().min(24).optional(),
}).superRefine((value, context) => {
  if (value.RATE_LIMIT_E2E_BYPASS_ENABLED && !value.RATE_LIMIT_E2E_BYPASS_KEY) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "RATE_LIMIT_E2E_BYPASS_KEY is required when RATE_LIMIT_E2E_BYPASS_ENABLED=true",
      path: ["RATE_LIMIT_E2E_BYPASS_KEY"],
    });
  }
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
