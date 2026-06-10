import "dotenv/config";
import { z } from "zod";

const cookieSameSiteSchema = z.enum(["strict", "lax", "none"]);
const corsOriginSchema = z
  .string()
  .default("http://localhost:3000")
  .transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().url()).min(1));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(10).startsWith("postgresql://"),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: corsOriginSchema,
  COOKIE_SECURE: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value ? value === "true" : process.env.NODE_ENV === "production")),
  COOKIE_SAME_SITE: cookieSameSiteSchema.default("strict"),
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

  if (value.COOKIE_SAME_SITE === "none" && !value.COOKIE_SECURE) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "COOKIE_SECURE must be true when COOKIE_SAME_SITE=none",
      path: ["COOKIE_SECURE"],
    });
  }
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
