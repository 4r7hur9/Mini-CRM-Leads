"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { getApiErrorMessage } from "@/services/api";
import {
  createLead,
  deleteLead,
  listLeads,
  updateLead,
} from "../services/leadService";
import type { Lead, LeadListFilters, LeadListMeta, LeadPayload } from "../types";
import { LeadFilters } from "./LeadFilters";
import { LeadForm } from "./LeadForm";
import { LeadListItem } from "./LeadListItem";

export function LeadsPageClient() {
  const [filters, setFilters] = useState<LeadListFilters>({ limit: 20, page: 1 });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<LeadListMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  async function loadLeads(nextFilters = filters) {
    setError(null);
    setIsLoading(true);

    try {
      const result = await listLeads(nextFilters);
      setLeads(result.leads);
      setMeta(result.meta);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadLeads(filters);
  }, [filters]);

  async function handleCreate(payload: LeadPayload) {
    setIsSaving(true);

    try {
      await createLead(payload);
      setCreateOpen(false);
      await loadLeads({ ...filters, page: 1 });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdate(payload: LeadPayload) {
    if (!editingLead) {
      return;
    }

    setIsSaving(true);

    try {
      await updateLead(editingLead.id, payload);
      setEditingLead(null);
      await loadLeads(filters);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(lead: Lead) {
    const confirmed = window.confirm(`Excluir o lead "${lead.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(lead.id);
      await loadLeads(filters);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-teal-700">Leads</p>
            <h2 className="mt-3 text-3xl font-black text-stone-950">Carteira comercial</h2>
            <p className="mt-3 max-w-2xl leading-7 text-stone-600">
              Busque, filtre e mantenha os dados de contato sempre prontos para a proxima acao.
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus aria-hidden="true" size={18} />
            Novo lead
          </Button>
        </div>
      </section>

      <LeadFilters filters={filters} onChange={setFilters} />

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <Spinner label="Carregando leads" />
      ) : leads.length === 0 ? (
        <EmptyState
          action={<Button onClick={() => setCreateOpen(true)}>Criar lead</Button>}
          description="A lista esta vazia para os filtros atuais."
          title="Nenhum lead encontrado"
        />
      ) : (
        <section className="grid gap-3">
          {leads.map((lead) => (
            <LeadListItem
              key={lead.id}
              lead={lead}
              onDelete={handleDelete}
              onEdit={setEditingLead}
            />
          ))}
        </section>
      )}

      {meta ? (
        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-[var(--surface)] px-4 py-3 text-sm text-stone-600">
          <span>
            Pagina {meta.page} de {Math.max(meta.totalPages, 1)} · {meta.total} leads
          </span>
          <div className="flex gap-2">
            <Button
              disabled={meta.page <= 1}
              onClick={() => setFilters({ ...filters, page: (filters.page ?? 1) - 1 })}
              size="sm"
              variant="ghost"
            >
              Anterior
            </Button>
            <Button
              disabled={meta.page >= meta.totalPages}
              onClick={() => setFilters({ ...filters, page: (filters.page ?? 1) + 1 })}
              size="sm"
              variant="ghost"
            >
              Proxima
            </Button>
          </div>
        </footer>
      ) : null}

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Novo lead">
        <LeadForm
          isSubmitting={isSaving}
          onCancel={() => setCreateOpen(false)}
          onSubmit={handleCreate}
        />
      </Modal>

      <Modal
        isOpen={Boolean(editingLead)}
        onClose={() => setEditingLead(null)}
        title="Editar lead"
      >
        {editingLead ? (
          <LeadForm
            initialLead={editingLead}
            isSubmitting={isSaving}
            onCancel={() => setEditingLead(null)}
            onSubmit={handleUpdate}
          />
        ) : null}
      </Modal>
    </div>
  );
}
