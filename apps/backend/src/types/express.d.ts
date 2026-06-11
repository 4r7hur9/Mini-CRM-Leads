/**
 * Contratos compartilhados.
 *
 * Responsavel por extensao do Request com usuario autenticado.
 *
 * E compartilhado entre controllers, services, repositories e testes.
 */
import type { AuthenticatedUser } from "./auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
