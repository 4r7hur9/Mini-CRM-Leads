"use client";

import { ArrowLeft, Building2, Mail, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { getApiErrorMessage } from "@/services/api";
import { formatDate, formatDateTime } from "@/lib/formatters";
import {
  createInteraction,
  deleteInteraction,
  deleteLead,
  getLead,
  updateLead,
  updateLeadStatus,
} from "../services/leadService";
import type { InteractionPayload, LeadPayload, LeadStatus, LeadWithInteractions } from "../types";
import { LEAD_STATUSES, leadStatusLabels } from "../constants";
import { LeadForm } from "./LeadForm";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { InteractionForm, interactionLabels } from "./InteractionForm";

type LeadDetailPageClientProps = {
  leadId: string;
};

export function LeadDetailPageClient({ leadId }: LeadDetailPageClientProps) {
  const router = useRouter();
  const [lead, setLead] = useState<LeadWithInteractions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  async function loadLead() {
    setError(null);
    setIsLoading(true);

    try {
      setLead(await getLead(leadId));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadLead();
  }, [leadId]);

  async function handleUpdate(payload: LeadPayload) {
    if (!lead) {
      return;
    }

    setIsSaving(true);

    try {
      await updateLead(lead.id, payload);
      setEditOpen(false);
      await loadLead();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(status: LeadStatus) {
    if (!lead || lead.status === status) {
      return;
    }

    const previous = lead;
    setLead({ ...lead, status });

    try {
      await updateLeadStatus(lead.id, status);
    } catch (requestError) {
      setLead(previous);
      setError(getApiErrorMessage(requestError));
    }
  }

  async function handleCreateInteraction(payload: InteractionPayload) {
    if (!lead) {
      return;
    }

    setIsSaving(true);

    try {
      await createInteraction(lead.id, payload);
      await loadLead();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteInteraction(interactionId: string) {
    if (!lead) {
      return;
    }

    try {
      await deleteInteraction(lead.id, interactionId);
      await loadLead();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  async function handleDeleteLead() {
    if (!lead || !window.confirm(`Excluir o lead "${lead.name}"?`)) {
      return;
    }

    await deleteLead(lead.id);
    router.replace("/leads");
  }

  if (isLoading) {
    return <Spinner label="Carregando lead" />;
  }

  if (error && !lead) {
    return (
      <EmptyState
        action={<Button onClick={loadLead}>Tentar novamente</Button>}
        description={error}
        title="Nao foi possivel carregar este lead"
      />
    );
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <Link className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-stone-600 hover:text-teal-800" href="/leads">
        <ArrowLeft aria-hidden="true" size={18} />
        Voltar para leads
      </Link>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <section className="rounded-lg border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-3xl font-black text-stone-950">{lead.name}</h2>
              <LeadStatusBadge status={lead.status} />
            </div>
            <p className="mt-2 text-sm text-stone-500">Criado em {formatDate(lead.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setEditOpen(true)} variant="secondary">
              Editar
            </Button>
            <Button onClick={handleDeleteLead} variant="danger">
              <Trash2 aria-hidden="true" size={18} />
              Excluir
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoItem icon={<Mail size={18} />} label="E-mail" value={lead.email ?? "Sem e-mail"} />
          <InfoItem icon={<Phone size={18} />} label="Telefone" value={lead.phone ?? "Sem telefone"} />
          <InfoItem icon={<Building2 size={18} />} label="Empresa/origem" value={lead.company ?? "Sem origem"} />
        </div>

        <div className="mt-6 grid gap-2">
          <label className="text-sm font-semibold text-stone-800" htmlFor="detail-status">
            Status
          </label>
          <select
            className="min-h-11 max-w-sm rounded-md border border-stone-300 bg-white px-3 text-stone-950 shadow-sm"
            id="detail-status"
            onChange={(event) => handleStatusChange(event.target.value as LeadStatus)}
            value={lead.status}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {leadStatusLabels[status]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 rounded-lg bg-stone-50 p-4">
          <h3 className="font-bold text-stone-950">Observacoes</h3>
          <p className="mt-2 leading-7 text-stone-600">{lead.notes ?? "Nenhuma observacao registrada."}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[24rem_1fr]">
        <div className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="text-xl font-bold text-stone-950">Nova interacao</h3>
          <div className="mt-4">
            <InteractionForm isSubmitting={isSaving} onSubmit={handleCreateInteraction} />
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="text-xl font-bold text-stone-950">Historico</h3>
          <div className="mt-4 grid gap-3">
            {lead.interactions.length ? (
              lead.interactions.map((interaction) => (
                <article className="rounded-lg border border-stone-200 p-4" key={interaction.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <strong className="text-stone-950">{interactionLabels[interaction.type]}</strong>
                      <p className="mt-1 text-xs font-semibold text-stone-400">
                        {formatDateTime(interaction.createdAt)}
                      </p>
                    </div>
                    <Button
                      aria-label="Excluir interacao"
                      onClick={() => handleDeleteInteraction(interaction.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </Button>
                  </div>
                  <p className="mt-3 leading-7 text-stone-600">{interaction.description}</p>
                </article>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-stone-300 p-4 text-sm text-stone-500">
                Nenhuma interacao registrada.
              </p>
            )}
          </div>
        </div>
      </section>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Editar lead">
        <LeadForm
          initialLead={lead}
          isSubmitting={isSaving}
          onCancel={() => setEditOpen(false)}
          onSubmit={handleUpdate}
        />
      </Modal>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-2 text-stone-500">
        {icon}
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-2 truncate font-bold text-stone-950">{value}</p>
    </div>
  );
}
