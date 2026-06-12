/**
 * Componente de leads.
 *
 * Responsavel por schemas de validacao de leads.
 *
 * Conecta formularios, listas, interacoes e movimentacao de status.
 */
import { z } from "zod";
import { LEAD_STATUSES } from "./constants";

const emptyToNull = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? null : value;

const optionalTextSchema = (maxLength: number) =>
  z.preprocess(emptyToNull, z.string().trim().max(maxLength).nullable().optional());

const optionalEmailSchema = z.preprocess(
  emptyToNull,
  z
    .string()
    .trim()
    .email("Informe um e-mail valido.")
    .max(255, "E-mail deve ter no maximo 255 caracteres.")
    .toLowerCase()
    .nullable()
    .optional(),
);

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter no minimo 2 caracteres.")
    .max(120, "Nome deve ter no maximo 120 caracteres."),
  phone: optionalTextSchema(30),
  email: optionalEmailSchema,
  company: optionalTextSchema(120),
  status: z.enum(LEAD_STATUSES),
  notes: optionalTextSchema(1000),
});

export const interactionSchema = z.object({
  type: z.enum(["LIGACAO", "WHATSAPP", "EMAIL", "REUNIAO", "OBSERVACAO"]),
  description: z
    .string()
    .trim()
    .min(3, "Descricao deve ter no minimo 3 caracteres.")
    .max(1000, "Descricao deve ter no maximo 1000 caracteres."),
});

export type LeadFormInput = z.input<typeof leadSchema>;
export type LeadFormData = z.output<typeof leadSchema>;
export type InteractionFormData = z.infer<typeof interactionSchema>;
