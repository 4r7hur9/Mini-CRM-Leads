/**
 * Componente de leads.
 *
 * Responsavel por badge de status do lead.
 *
 * Conecta formularios, listas, interacoes e movimentacao de status.
 */
import { Badge } from "@/components/ui/Badge";
import { leadStatusLabels, leadStatusTone } from "../constants";
import type { LeadStatus } from "../types";

type LeadStatusBadgeProps = {
  status: LeadStatus;
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return <Badge tone={leadStatusTone[status]}>{leadStatusLabels[status]}</Badge>;
}
