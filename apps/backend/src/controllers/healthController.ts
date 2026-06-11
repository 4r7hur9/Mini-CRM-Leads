/**
 * Controller da API.
 *
 * Responsavel por endpoint de saude da API.
 *
 * Conecta as rotas ao service correto e padroniza a resposta HTTP.
 */
import type { RequestHandler } from "express";

export const healthCheck: RequestHandler = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "mini-crm-leads-api",
    },
  });
};
