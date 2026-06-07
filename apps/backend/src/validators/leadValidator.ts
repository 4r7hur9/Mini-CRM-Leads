import { LeadStatus } from "@prisma/client";
import { z } from "zod";

const emptyToNull = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? null : value;
const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalTextSchema = (maxLength: number) =>
  z.preprocess(
    emptyToNull,
    z.string().trim().max(maxLength).nullable().optional(),
  );

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

export const leadIdParamsSchema = z.object({
  id: z.string().uuid("ID do lead invalido."),
});

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter no minimo 2 caracteres.")
    .max(120, "Nome deve ter no maximo 120 caracteres."),
  phone: optionalTextSchema(30),
  email: optionalEmailSchema,
  company: optionalTextSchema(120),
  status: z.nativeEnum(LeadStatus).optional(),
  notes: optionalTextSchema(1000),
});

export const updateLeadSchema = createLeadSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Informe pelo menos um campo para atualizar.",
  });

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.nativeEnum(LeadStatus).optional(),
  search: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(100).optional(),
  ),
});

export const updateLeadStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type ListLeadsQuery = z.infer<typeof listLeadsQuerySchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;
