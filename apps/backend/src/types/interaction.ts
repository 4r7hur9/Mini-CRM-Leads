/**
 * Contratos compartilhados.
 *
 * Responsavel por contratos de interacao.
 *
 * E compartilhado entre controllers, services, repositories e testes.
 */
import type { InteractionType } from "@prisma/client";

export type CreateInteractionData = {
  type: InteractionType;
  description: string;
};
