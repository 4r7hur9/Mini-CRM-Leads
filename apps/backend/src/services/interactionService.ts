import type { Interaction } from "@prisma/client";
import * as interactionRepository from "../repositories/interactionRepository";
import * as leadService from "./leadService";
import type { CreateInteractionData } from "../types/interaction";
import { AppError } from "../utils/AppError";

function createInteractionNotFoundError() {
  return new AppError("NOT_FOUND", "Interacao nao encontrada.", 404);
}

/**
 * Cria uma interacao apos confirmar que o lead pertence ao usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} leadId - ID do lead alvo.
 * @param {CreateInteractionData} data - Dados validados da interacao.
 * @returns {Promise<Interaction>} Interacao criada.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function create(
  userId: string,
  leadId: string,
  data: CreateInteractionData,
): Promise<Interaction> {
  await leadService.findById(userId, leadId);

  return interactionRepository.create(leadId, data);
}

/**
 * Lista interacoes apos confirmar ownership do lead.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} leadId - ID do lead alvo.
 * @returns {Promise<Interaction[]>} Interacoes ordenadas por createdAt DESC.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function findAll(userId: string, leadId: string): Promise<Interaction[]> {
  await leadService.findById(userId, leadId);

  return interactionRepository.findAllByLeadId(leadId);
}

/**
 * Remove uma interacao apos confirmar ownership do lead e da interacao.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} leadId - ID do lead alvo.
 * @param {string} interactionId - ID da interacao.
 * @returns {Promise<void>} Resolvido quando a interacao for removida.
 * @throws {AppError} NOT_FOUND se lead/interacao nao existir ou pertencer a outro usuario.
 */
export async function remove(
  userId: string,
  leadId: string,
  interactionId: string,
): Promise<void> {
  await leadService.findById(userId, leadId);

  const interaction = await interactionRepository.findByIdAndLeadId(
    interactionId,
    leadId,
  );

  if (!interaction) {
    throw createInteractionNotFoundError();
  }

  await interactionRepository.remove(interactionId);
}
