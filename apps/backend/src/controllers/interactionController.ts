/**
 * Controller da API.
 *
 * Responsavel por CRUD de interacoes.
 *
 * Conecta as rotas ao service correto e padroniza a resposta HTTP.
 */
import type { Request } from "express";
import * as interactionService from "../services/interactionService";
import type { CreateInteractionInput } from "../validators/interactionValidator";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

function getAuthenticatedUserId(req: Request): string {
  if (!req.user) {
    throw new AppError("UNAUTHORIZED", "Usuario nao autenticado.", 401);
  }

  return req.user.id;
}

export const create = asyncHandler(async (req, res) => {
  const interaction = await interactionService.create(
    getAuthenticatedUserId(req),
    req.params.leadId,
    req.body as CreateInteractionInput,
  );

  return res.status(201).json({
    success: true,
    data: interaction,
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const interactions = await interactionService.findAll(
    getAuthenticatedUserId(req),
    req.params.leadId,
  );

  return res.status(200).json({
    success: true,
    data: interactions,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await interactionService.remove(
    getAuthenticatedUserId(req),
    req.params.leadId,
    req.params.interactionId,
  );

  return res.status(200).json({
    success: true,
    data: {
      message: "Interacao removida",
    },
  });
});
