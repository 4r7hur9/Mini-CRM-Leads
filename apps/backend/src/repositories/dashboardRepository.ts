import { LeadStatus } from "@prisma/client";
import { prisma } from "../config/database";

/**
 * Conta todos os leads pertencentes ao usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<number>} Total de leads do usuario.
 */
export async function countLeadsByUserId(userId: string): Promise<number> {
  return prisma.lead.count({
    where: { userId },
  });
}

/**
 * Agrupa leads do usuario autenticado por status.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<Array<{ status: LeadStatus; _count: { status: number } }>>} Contagens por status.
 */
export async function countLeadsGroupedByStatus(userId: string) {
  return prisma.lead.groupBy({
    by: ["status"],
    where: { userId },
    _count: {
      status: true,
    },
  });
}

/**
 * Conta todas as interacoes dos leads pertencentes ao usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<number>} Total de interacoes vinculadas aos leads do usuario.
 */
export async function countInteractionsByUserId(userId: string): Promise<number> {
  return prisma.interaction.count({
    where: {
      lead: {
        userId,
      },
    },
  });
}

/**
 * Busca os leads mais recentes do usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<Lead[]>} Ultimos cinco leads criados pelo usuario.
 */
export async function findRecentLeadsByUserId(userId: string) {
  return prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export const ALL_LEAD_STATUSES = [
  LeadStatus.NOVO,
  LeadStatus.EM_ATENDIMENTO,
  LeadStatus.PROPOSTA_ENVIADA,
  LeadStatus.FECHADO,
] as const;
