"use client";

/**
 * Componente de leads.
 *
 * Responsavel por filtros da lista de leads.
 *
 * Conecta formularios, listas, interacoes e movimentacao de status.
 */
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { LEAD_STATUSES, leadStatusLabels } from "../constants";
import type { LeadListFilters, LeadStatus } from "../types";

type LeadFiltersProps = {
  filters: LeadListFilters;
  onChange: (filters: LeadListFilters) => void;
};

export function LeadFilters({ filters, onChange }: LeadFiltersProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-stone-200 bg-[var(--surface)] p-4 shadow-sm md:grid-cols-[1fr_220px_auto] md:items-end">
      <TextField
        id="lead-search"
        label="Buscar"
        onChange={(event) => onChange({ ...filters, page: 1, search: event.target.value })}
        placeholder="Nome, e-mail ou empresa"
        value={filters.search ?? ""}
      />
      <SelectField
        id="lead-status-filter"
        label="Status"
        onChange={(event) =>
          onChange({
            ...filters,
            page: 1,
            status: event.target.value as LeadStatus | "",
          })
        }
        value={filters.status ?? ""}
      >
        <option value="">Todos</option>
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {leadStatusLabels[status]}
          </option>
        ))}
      </SelectField>
      <Button onClick={() => onChange({ limit: filters.limit ?? 20, page: 1 })} variant="ghost">
        <Search aria-hidden="true" size={18} />
        Limpar
      </Button>
    </div>
  );
}
