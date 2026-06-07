import type { LeadStatus } from "@prisma/client";
import * as dashboardRepository from "../repositories/dashboardRepository";
import type { DashboardSummary } from "../types/dashboard";

/**
 * Consolida metricas do funil para o usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<DashboardSummary>} Totais, contagem por status e leads recentes.
 */
export async function getSummary(userId: string): Promise<DashboardSummary> {
  const [totalLeads, groupedByStatus, totalInteractions, recentLeads] =
    await Promise.all([
      dashboardRepository.countLeadsByUserId(userId),
      dashboardRepository.countLeadsGroupedByStatus(userId),
      dashboardRepository.countInteractionsByUserId(userId),
      dashboardRepository.findRecentLeadsByUserId(userId),
    ]);

  const leadsByStatus = dashboardRepository.ALL_LEAD_STATUSES.reduce(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {} as Record<LeadStatus, number>,
  );

  for (const item of groupedByStatus) {
    leadsByStatus[item.status] = item._count.status;
  }

  return {
    totalLeads,
    leadsByStatus,
    totalInteractions,
    recentLeads,
  };
}
