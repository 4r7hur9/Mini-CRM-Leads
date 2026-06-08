import { api } from "@/services/api";
import type { ApiSuccess } from "@/types/api";
import type { DashboardSummary } from "@/features/leads/types";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<ApiSuccess<DashboardSummary>>("/dashboard");
  return response.data.data;
}
