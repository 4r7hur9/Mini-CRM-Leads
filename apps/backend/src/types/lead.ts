import type { Lead, LeadStatus } from "@prisma/client";

export type LeadNullableFields = {
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  notes?: string | null;
};

export type CreateLeadData = LeadNullableFields & {
  name: string;
  status?: LeadStatus;
};

export type UpdateLeadData = Partial<CreateLeadData>;

export type ListLeadFilters = {
  page: number;
  limit: number;
  status?: LeadStatus;
  search?: string;
};

export type LeadListResult = {
  leads: Lead[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
