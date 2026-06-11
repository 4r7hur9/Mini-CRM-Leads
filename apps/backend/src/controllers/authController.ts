/**
 * Controller da API.
 *
 * Responsavel por register, login, logout e me.
 *
 * Conecta as rotas ao service correto e padroniza a resposta HTTP.
 */
import { asyncHandler } from "../utils/asyncHandler";
import * as authService from "../services/authService";
import { AppError } from "../utils/AppError";
import {
  AUTH_COOKIE_NAME,
  clearCookieOptions,
  cookieOptions,
} from "../utils/cookieOptions";

export const register = asyncHandler(async (req, res) => {
  const authResult = await authService.register(req.body);

  res.cookie(AUTH_COOKIE_NAME, authResult.token, cookieOptions);

  return res.status(201).json({
    success: true,
    data: authResult.user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const authResult = await authService.login(req.body);

  res.cookie(AUTH_COOKIE_NAME, authResult.token, cookieOptions);

  return res.status(200).json({
    success: true,
    data: authResult.user,
  });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, clearCookieOptions);

  return res.status(200).json({
    success: true,
    data: {
      message: "Logout realizado com sucesso",
    },
  });
});

export const me = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new AppError("UNAUTHORIZED", "Usuario nao autenticado.", 401);
  }

  const user = await authService.getCurrentUser(req.user.id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});
