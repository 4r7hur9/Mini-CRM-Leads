/**
 * Configuracao de cookies httpOnly.
 *
 * Responsavel por opcoes do cookie httpOnly do token.
 *
 * Centraliza as opcoes usadas para persistir e limpar a sessao autenticada.
 */
import type { CookieOptions } from "express";
import { env } from "../config/env";

export const AUTH_COOKIE_NAME = "mini_crm_token";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: env.COOKIE_SAME_SITE,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 0,
};
