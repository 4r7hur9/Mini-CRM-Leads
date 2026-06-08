"use client";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import Link from "next/link";
import { SelectField } from "@/components/ui/SelectField";
import { formatDate } from "@/lib/formatters";
import { LEAD_STATUSES, leadStatusLabels } from "@/features/leads/constants";
import type { Lead, LeadStatus } from "@/features/leads/types";
import { LeadStatusBadge } from "@/features/leads/components/LeadStatusBadge";

type KanbanBoardProps = {
  leads: Lead[];
  onMoveLead: (leadId: string, status: LeadStatus) => Promise<void>;
};

function KanbanCard({ lead, onMoveLead }: { lead: Lead; onMoveLead: KanbanBoardProps["onMoveLead"] }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: {
      lead,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
      data-testid="kanban-card"
      className={`rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition ${
        isDragging ? "relative z-20 opacity-80 shadow-xl" : ""
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          className="font-bold text-stone-950 hover:text-teal-800"
          data-testid="lead-name"
          href={`/leads/${lead.id}`}
        >
          {lead.name}
        </Link>
        <button
          aria-label={`Mover ${lead.name}`}
          className="hidden rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 md:inline-flex"
          type="button"
          {...listeners}
          {...attributes}
        >
          <GripVertical aria-hidden="true" size={18} />
        </button>
      </div>
      <p className="mt-2 text-sm text-stone-500">{lead.company ?? lead.email ?? "Sem origem"}</p>
      <p className="mt-3 text-xs font-semibold text-stone-400">Criado em {formatDate(lead.createdAt)}</p>

      <div className="mt-4 md:hidden">
        <SelectField
          data-testid="status-select"
          id={`status-${lead.id}`}
          label="Mover para"
          onChange={(event) => onMoveLead(lead.id, event.target.value as LeadStatus)}
          value={lead.status}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {leadStatusLabels[status]}
            </option>
          ))}
        </SelectField>
      </div>
    </article>
  );
}

function KanbanColumn({
  leads,
  onMoveLead,
  status,
}: {
  leads: Lead[];
  onMoveLead: KanbanBoardProps["onMoveLead"];
  status: LeadStatus;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <section
      data-testid={`kanban-column-${status}`}
      className={`min-h-80 min-w-[18rem] rounded-lg border p-3 transition ${
        isOver ? "border-teal-400 bg-teal-50" : "border-stone-200 bg-white/65"
      }`}
      ref={setNodeRef}
    >
      <header className="mb-3 flex items-center justify-between gap-3">
        <LeadStatusBadge status={status} />
        <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-bold text-stone-600">
          {leads.length}
        </span>
      </header>
      <div className="grid gap-3">
        {leads.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} onMoveLead={onMoveLead} />
        ))}
        {leads.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stone-300 p-4 text-sm text-stone-500">
            Sem leads neste status
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function KanbanBoard({ leads, onMoveLead }: KanbanBoardProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 160, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const lead = event.active.data.current?.lead as Lead | undefined;
    const status = event.over?.id as LeadStatus | undefined;

    if (!lead || !status || lead.status === status) {
      return;
    }

    await onMoveLead(lead.id, status);
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[72rem] grid-cols-4 gap-4">
          {LEAD_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              leads={leads.filter((lead) => lead.status === status)}
              onMoveLead={onMoveLead}
              status={status}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
