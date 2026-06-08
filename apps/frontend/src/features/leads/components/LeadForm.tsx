"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { TextField } from "@/components/ui/TextField";
import { LEAD_STATUSES, leadStatusLabels } from "../constants";
import type { Lead, LeadPayload } from "../types";
import { leadSchema, type LeadFormData, type LeadFormInput } from "../validators";

type LeadFormProps = {
  initialLead?: Lead;
  isSubmitting?: boolean;
  onCancel?: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void>;
};

function toPayload(data: LeadFormData): LeadPayload {
  return {
    company: data.company ?? null,
    email: data.email ?? null,
    name: data.name,
    notes: data.notes ?? null,
    phone: data.phone ?? null,
    status: data.status,
  };
}

export function LeadForm({ initialLead, isSubmitting, onCancel, onSubmit }: LeadFormProps) {
  const {
    formState: { errors, isSubmitting: formSubmitting },
    handleSubmit,
    register,
  } = useForm<LeadFormInput, unknown, LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      company: initialLead?.company ?? "",
      email: initialLead?.email ?? "",
      name: initialLead?.name ?? "",
      notes: initialLead?.notes ?? "",
      phone: initialLead?.phone ?? "",
      status: initialLead?.status ?? "NOVO",
    },
  });

  const disabled = Boolean(isSubmitting || formSubmitting);

  return (
    <form
      className="grid gap-4"
      onSubmit={handleSubmit(async (data) => onSubmit(toPayload(data)))}
    >
      <TextField
        error={errors.name?.message}
        id="lead-name"
        label="Nome"
        placeholder="Nome do lead"
        {...register("name")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          error={errors.email?.message}
          id="lead-email"
          label="E-mail"
          placeholder="lead@email.com"
          type="email"
          {...register("email")}
        />
        <TextField
          error={errors.phone?.message}
          id="lead-phone"
          label="Telefone"
          placeholder="(11) 99999-9999"
          {...register("phone")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          error={errors.company?.message}
          id="lead-company"
          label="Empresa ou origem"
          placeholder="Site, Instagram, indicacao"
          {...register("company")}
        />
        <SelectField error={errors.status?.message} id="lead-status" label="Status" {...register("status")}>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {leadStatusLabels[status]}
            </option>
          ))}
        </SelectField>
      </div>

      <TextAreaField
        error={errors.notes?.message}
        id="lead-notes"
        label="Observacoes"
        placeholder="Contexto, dores, proximos passos..."
        {...register("notes")}
      />

      <div className="flex flex-wrap justify-end gap-3">
        {onCancel ? (
          <Button disabled={disabled} onClick={onCancel} type="button" variant="ghost">
            Cancelar
          </Button>
        ) : null}
        <Button disabled={disabled} type="submit">
          <Save aria-hidden="true" size={18} />
          {initialLead ? "Salvar lead" : "Criar lead"}
        </Button>
      </div>
    </form>
  );
}
