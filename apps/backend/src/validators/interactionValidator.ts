/**
 * Validador de entrada.
 *
 * Responsavel por schema de interacoes.
 *
 * E usado pelo validationMiddleware antes da execucao do controller.
 */
import { InteractionType } from "@prisma/client";
import { z } from "zod";

export const leadInteractionParamsSchema = z.object({
  leadId: z.string().uuid("ID do lead invalido."),
});

export const interactionParamsSchema = leadInteractionParamsSchema.extend({
  interactionId: z.string().uuid("ID da interacao invalido."),
});

export const createInteractionSchema = z.object({
  type: z.nativeEnum(InteractionType),
  description: z
    .string()
    .trim()
    .min(3, "Descricao deve ter no minimo 3 caracteres.")
    .max(1000, "Descricao deve ter no maximo 1000 caracteres."),
});

export type CreateInteractionInput = z.infer<typeof createInteractionSchema>;
