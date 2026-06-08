import { api } from "@/services/api";
import type { ApiSuccess } from "@/types/api";
import type {
  Interaction,
  InteractionPayload,
  Lead,
  LeadListFilters,
  LeadListMeta,
  LeadPayload,
  LeadStatus,
  LeadWithInteractions,
} from "../types";

type LeadListResponse = ApiSuccess<Lead[]> & {
  meta: LeadListMeta;
};

function buildQuery(filters: LeadListFilters = {}) {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? 20));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  return params.toString();
}

export async function listLeads(filters?: LeadListFilters) {
  const query = buildQuery(filters);
  const response = await api.get<LeadListResponse>(`/leads?${query}`);
  return {
    leads: response.data.data,
    meta: response.data.meta,
  };
}

export async function getLead(id: string): Promise<LeadWithInteractions> {
  const response = await api.get<ApiSuccess<LeadWithInteractions>>(`/leads/${id}`);
  return response.data.data;
}

export async function createLead(payload: LeadPayload): Promise<Lead> {
  const response = await api.post<ApiSuccess<Lead>>("/leads", payload);
  return response.data.data;
}

export async function updateLead(id: string, payload: LeadPayload): Promise<Lead> {
  const response = await api.put<ApiSuccess<Lead>>(`/leads/${id}`, payload);
  return response.data.data;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  const response = await api.patch<ApiSuccess<Lead>>(`/leads/${id}/status`, { status });
  return response.data.data;
}

export async function deleteLead(id: string): Promise<void> {
  await api.delete(`/leads/${id}`);
}

export async function createInteraction(
  leadId: string,
  payload: InteractionPayload,
): Promise<Interaction> {
  const response = await api.post<ApiSuccess<Interaction>>(
    `/leads/${leadId}/interactions`,
    payload,
  );
  return response.data.data;
}

export async function deleteInteraction(
  leadId: string,
  interactionId: string,
): Promise<void> {
  await api.delete(`/leads/${leadId}/interactions/${interactionId}`);
}
