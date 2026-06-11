/**
 * Componente de leads.
 *
 * Responsavel por item individual da listagem.
 *
 * Conecta formularios, listas, interacoes e movimentacao de status.
 */
import { Building2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/formatters";
import type { Lead } from "../types";
import { LeadStatusBadge } from "./LeadStatusBadge";

type LeadListItemProps = {
  lead: Lead;
  onDelete: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
};

export function LeadListItem({ lead, onDelete, onEdit }: LeadListItemProps) {
  return (
    <article className="animate-slide-up rounded-lg border border-stone-200 bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link className="text-lg font-bold text-stone-950 hover:text-teal-800" href={`/leads/${lead.id}`}>
              {lead.name}
            </Link>
            <LeadStatusBadge status={lead.status} />
          </div>
          <p className="mt-1 text-sm text-stone-500">Criado em {formatDate(lead.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(lead)} size="sm" variant="ghost">
            Editar
          </Button>
          <Button onClick={() => onDelete(lead)} size="sm" variant="danger">
            Excluir
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-3">
        <span className="flex min-w-0 items-center gap-2">
          <Mail aria-hidden="true" size={16} />
          <span className="truncate">{lead.email ?? "Sem e-mail"}</span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <Phone aria-hidden="true" size={16} />
          <span className="truncate">{lead.phone ?? "Sem telefone"}</span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <Building2 aria-hidden="true" size={16} />
          <span className="truncate">{lead.company ?? "Sem origem"}</span>
        </span>
      </div>
    </article>
  );
}
