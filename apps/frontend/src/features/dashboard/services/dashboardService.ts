/**
 * Servico de negocio do backend.
 *
 * Responsavel por chamadas do dashboard na API.
 *
 * Faz a ponte entre controllers e repositories, concentrando regras de negocio.
 */
import { api } from "@/services/api";
import type { ApiSuccess } from "@/types/api";
import type { DashboardSummary } from "@/features/leads/types";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<ApiSuccess<DashboardSummary>>("/dashboard");
  return response.data.data;
}
