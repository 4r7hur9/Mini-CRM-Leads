"use client";

/**
 * Componente do dashboard.
 *
 * Responsavel por pagina client do dashboard.
 *
 * Consome o dashboard e organiza metricas e Kanban.
 */
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { notifyError, notifySuccess } from "@/lib/toast";
import { getApiErrorMessage } from "@/services/api";
import { formatDate } from "@/lib/formatters";
import { LEAD_STATUSES, leadStatusLabels } from "@/features/leads/constants";
import { listLeads, updateLeadStatus } from "@/features/leads/services/leadService";
import type { DashboardSummary, Lead, LeadStatus } from "@/features/leads/types";
import { getDashboardSummary } from "../services/dashboardService";
import { KanbanBoard } from "./KanbanBoard";
import { MetricCard } from "./MetricCard";

export function DashboardPageClient() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadDashboard() {
    setError(null);
    setIsLoading(true);

    try {
      const [summaryData, leadsData] = await Promise.all([
        getDashboardSummary(),
        listLeads({ limit: 100, page: 1 }),
      ]);

      setSummary(summaryData);
      setLeads(leadsData.leads);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleMoveLead(leadId: string, status: LeadStatus) {
    const previous = leads;

    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
    );

    try {
      await updateLeadStatus(leadId, status);
      setSummary(await getDashboardSummary());
      notifySuccess(`Lead movido para ${leadStatusLabels[status]}.`);
    } catch (requestError) {
      setLeads(previous);
      setError(getApiErrorMessage(requestError));
      notifyError(requestError, "Nao foi possivel mover o lead.");
    }
  }

  if (isLoading) {
    return <Spinner label="Carregando dashboard" />;
  }

  if (error) {
    return (
      <EmptyState
        action={<Button onClick={loadDashboard}>Tentar novamente</Button>}
        description={error}
        title="Nao foi possivel carregar o dashboard"
      />
    );
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-teal-700">Visao geral</p>
            <h2 className="mt-3 text-3xl font-black text-stone-950">Pipeline de leads</h2>
            <p className="mt-3 max-w-2xl leading-7 text-stone-600">
              Acompanhe volume, atividade e movimentacao por status em uma unica tela.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
            href="/leads"
          >
            <Plus aria-hidden="true" size={18} />
            Novo lead
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total de leads" value={summary?.totalLeads ?? 0} />
        <MetricCard label="Interacoes registradas" value={summary?.totalInteractions ?? 0} />
        <MetricCard
          label="Fechados"
          value={summary?.leadsByStatus.FECHADO ?? 0}
        />
      </section>

      <section className="grid gap-4 rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-stone-950">Funil por status</h3>
            <p className="mt-1 text-sm text-stone-600">
              Arraste cards entre colunas ou use o seletor em telas menores.
            </p>
          </div>
        </div>
        <KanbanBoard leads={leads} onMoveLead={handleMoveLead} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="text-xl font-bold text-stone-950">Distribuicao</h3>
          <div className="mt-4 grid gap-3">
            {LEAD_STATUSES.map((status) => (
              <div className="grid gap-2" key={status}>
                <div className="flex justify-between text-sm font-semibold text-stone-700">
                  <span>{leadStatusLabels[status]}</span>
                  <span>{summary?.leadsByStatus[status] ?? 0}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="h-full rounded-full bg-teal-700"
                    style={{
                      width: `${summary?.totalLeads ? ((summary.leadsByStatus[status] ?? 0) / summary.totalLeads) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
          <h3 className="text-xl font-bold text-stone-950">Recentes</h3>
          <div className="mt-4 grid gap-3">
            {summary?.recentLeads.length ? (
              summary.recentLeads.map((lead) => (
                <Link
                  className="rounded-md border border-stone-200 p-3 transition hover:border-teal-300 hover:bg-teal-50"
                  href={`/leads/${lead.id}`}
                  key={lead.id}
                >
                  <strong className="block text-stone-950">{lead.name}</strong>
                  <span className="text-sm text-stone-500">{formatDate(lead.createdAt)}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-stone-500">Nenhum lead recente.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
