import type { Interaction } from "@prisma/client";
import { prisma } from "../config/database";
import type { CreateInteractionData } from "../types/interaction";

/**
 * Cria uma interacao vinculada a um lead ja validado por ownership.
 *
 * @param {string} leadId - ID do lead pertencente ao usuario autenticado.
 * @param {CreateInteractionData} data - Dados validados da interacao.
 * @returns {Promise<Interaction>} Interacao criada.
 */
export async function create(
  leadId: string,
  data: CreateInteractionData,
): Promise<Interaction> {
  return prisma.interaction.create({
    data: {
      ...data,
      leadId,
    },
  });
}

/**
 * Lista interacoes de um lead ja validado por ownership.
 *
 * @param {string} leadId - ID do lead pertencente ao usuario autenticado.
 * @returns {Promise<Interaction[]>} Interacoes ordenadas da mais recente para a mais antiga.
 */
export async function findAllByLeadId(leadId: string): Promise<Interaction[]> {
  return prisma.interaction.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Busca uma interacao pelo ID e pelo lead associado.
 *
 * @param {string} id - ID da interacao.
 * @param {string} leadId - ID do lead dono da interacao.
 * @returns {Promise<Interaction | null>} Interacao encontrada ou null.
 */
export async function findByIdAndLeadId(
  id: string,
  leadId: string,
): Promise<Interaction | null> {
  return prisma.interaction.findFirst({
    where: {
      id,
      leadId,
    },
  });
}

/**
 * Remove uma interacao ja validada por lead e ownership.
 *
 * @param {string} id - ID da interacao.
 * @returns {Promise<Interaction>} Interacao removida.
 */
export async function remove(id: string): Promise<Interaction> {
  return prisma.interaction.delete({
    where: { id },
  });
}
