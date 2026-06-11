/**
 * Componente de leads.
 *
 * Responsavel por constantes de apoio da feature.
 *
 * Conecta formularios, listas, interacoes e movimentacao de status.
 */
import type { LeadStatus } from "./types";

export const LEAD_STATUSES = [
  "NOVO",
  "EM_ATENDIMENTO",
  "PROPOSTA_ENVIADA",
  "FECHADO",
] as const satisfies readonly LeadStatus[];

export const leadStatusLabels: Record<LeadStatus, string> = {
  NOVO: "Novo",
  EM_ATENDIMENTO: "Em atendimento",
  PROPOSTA_ENVIADA: "Proposta enviada",
  FECHADO: "Fechado",
};

export const leadStatusTone: Record<LeadStatus, "blue" | "green" | "orange" | "teal"> = {
  NOVO: "blue",
  EM_ATENDIMENTO: "teal",
  PROPOSTA_ENVIADA: "orange",
  FECHADO: "green",
};
