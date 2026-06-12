/**
 * Contratos compartilhados.
 *
 * Responsavel por contratos do dashboard.
 *
 * E compartilhado entre controllers, services, repositories e testes.
 */
import type { Lead, LeadStatus } from "@prisma/client";

export type DashboardSummary = {
  totalLeads: number;
  leadsByStatus: Record<LeadStatus, number>;
  totalInteractions: number;
  recentLeads: Lead[];
};
