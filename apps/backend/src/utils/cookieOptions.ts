import type { CookieOptions } from "express";
import { env } from "../config/env";

export const AUTH_COOKIE_NAME = "mini_crm_token";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 0,
};
