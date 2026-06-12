/**
 * Wrapper assincro de handlers.
 *
 * Responsavel por wrapper para capturar erros em handlers async.
 *
 * Evita try/catch repetido nos controllers e encaminha erros ao middleware central.
 */
import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response>;

export const asyncHandler =
  (fn: AsyncRequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
