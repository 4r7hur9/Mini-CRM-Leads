import type { Lead, LeadStatus } from "@prisma/client";

export type DashboardSummary = {
  totalLeads: number;
  leadsByStatus: Record<LeadStatus, number>;
  totalInteractions: number;
  recentLeads: Lead[];
};
