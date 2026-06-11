/**
 * Controller da API.
 *
 * Responsavel por CRUD e status dos leads.
 *
 * Conecta as rotas ao service correto e padroniza a resposta HTTP.
 */
import type { Request } from "express";
import * as leadService from "../services/leadService";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import type {
  CreateLeadInput,
  ListLeadsQuery,
  UpdateLeadInput,
  UpdateLeadStatusInput,
} from "../validators/leadValidator";

function getAuthenticatedUserId(req: Request): string {
  if (!req.user) {
    throw new AppError("UNAUTHORIZED", "Usuario nao autenticado.", 401);
  }

  return req.user.id;
}

export const create = asyncHandler(async (req, res) => {
  const lead = await leadService.create(
    getAuthenticatedUserId(req),
    req.body as CreateLeadInput,
  );

  return res.status(201).json({
    success: true,
    data: lead,
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const result = await leadService.findAll(
    getAuthenticatedUserId(req),
    req.query as unknown as ListLeadsQuery,
  );

  return res.status(200).json({
    success: true,
    data: result.leads,
    meta: result.meta,
  });
});

export const getById = asyncHandler(async (req, res) => {
  const lead = await leadService.findById(getAuthenticatedUserId(req), req.params.id);

  return res.status(200).json({
    success: true,
    data: lead,
  });
});

export const update = asyncHandler(async (req, res) => {
  const lead = await leadService.update(
    getAuthenticatedUserId(req),
    req.params.id,
    req.body as UpdateLeadInput,
  );

  return res.status(200).json({
    success: true,
    data: lead,
  });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body as UpdateLeadStatusInput;
  const lead = await leadService.updateStatus(
    getAuthenticatedUserId(req),
    req.params.id,
    status,
  );

  return res.status(200).json({
    success: true,
    data: lead,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await leadService.remove(getAuthenticatedUserId(req), req.params.id);

  return res.status(200).json({
    success: true,
    data: {
      message: "Lead removido",
    },
  });
});
