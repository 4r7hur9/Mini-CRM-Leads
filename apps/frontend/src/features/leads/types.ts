export type LeadStatus = "NOVO" | "EM_ATENDIMENTO" | "PROPOSTA_ENVIADA" | "FECHADO";

export type Lead = {
  id: string;
  userId: string;
  name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LeadWithInteractions = Lead & {
  interactions: Interaction[];
};

export type InteractionType = "LIGACAO" | "WHATSAPP" | "EMAIL" | "REUNIAO" | "OBSERVACAO";

export type Interaction = {
  id: string;
  leadId: string;
  type: InteractionType;
  description: string;
  createdAt: string;
};

export type LeadListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type LeadListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus | "";
};

export type LeadPayload = {
  name: string;
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  status?: LeadStatus;
  notes?: string | null;
};

export type InteractionPayload = {
  type: InteractionType;
  description: string;
};

export type DashboardSummary = {
  totalLeads: number;
  leadsByStatus: Record<LeadStatus, number>;
  totalInteractions: number;
  recentLeads: Lead[];
};
