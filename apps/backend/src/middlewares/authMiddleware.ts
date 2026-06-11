/**
 * Middleware da API.
 *
 * Responsavel por proteger rotas privadas com cookie httpOnly.
 *
 * Protege a entrada da API antes de chegar aos controllers.
 */
import type { RequestHandler } from "express";
import { verifyAuthToken } from "../services/authService";
import { AUTH_COOKIE_NAME } from "../utils/cookieOptions";
import { AppError } from "../utils/AppError";

export const authMiddleware: RequestHandler = (req, _res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (typeof token !== "string" || token.length === 0) {
      throw new AppError("UNAUTHORIZED", "Token ausente ou invalido.", 401);
    }

    req.user = verifyAuthToken(token);
    next();
  } catch (error) {
    next(error);
  }
};
