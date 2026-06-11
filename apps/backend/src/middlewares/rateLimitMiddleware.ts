/**
 * Middleware da API.
 *
 * Responsavel por aplicar limite geral e bypass de E2E.
 *
 * Protege a entrada da API antes de chegar aos controllers.
 */
import type { Request } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env";

const E2E_BYPASS_HEADER = "x-e2e-test-key";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function shouldSkipRateLimit(request: Request) {
  if (!env.RATE_LIMIT_E2E_BYPASS_ENABLED || !env.RATE_LIMIT_E2E_BYPASS_KEY) {
    return false;
  }

  if (!LOCAL_HOSTS.has(request.hostname)) {
    return false;
  }

  const headerValue = request.headers[E2E_BYPASS_HEADER];

  if (Array.isArray(headerValue)) {
    return headerValue.includes(env.RATE_LIMIT_E2E_BYPASS_KEY);
  }

  return headerValue === env.RATE_LIMIT_E2E_BYPASS_KEY;
}

export const generalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_GENERAL_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: shouldSkipRateLimit,
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Muitas requisicoes. Tente novamente em alguns minutos.",
    },
  },
});

export const authRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_AUTH_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: shouldSkipRateLimit,
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Muitas tentativas. Tente novamente em alguns minutos.",
    },
  },
});
