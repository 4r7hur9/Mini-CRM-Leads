/**
 * Controller da API.
 *
 * Responsavel por resumo do dashboard.
 *
 * Conecta as rotas ao service correto e padroniza a resposta HTTP.
 */
import type { Request } from "express";
import * as dashboardService from "../services/dashboardService";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

function getAuthenticatedUserId(req: Request): string {
  if (!req.user) {
    throw new AppError("UNAUTHORIZED", "Usuario nao autenticado.", 401);
  }

  return req.user.id;
}

export const getSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getSummary(getAuthenticatedUserId(req));

  return res.status(200).json({
    success: true,
    data: summary,
  });
});
