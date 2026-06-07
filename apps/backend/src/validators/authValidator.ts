import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Informe um e-mail valido.")
  .max(255, "E-mail deve ter no maximo 255 caracteres.")
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(8, "Senha deve ter no minimo 8 caracteres.")
  .max(72, "Senha deve ter no maximo 72 caracteres.");

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter no minimo 2 caracteres.")
    .max(120, "Nome deve ter no maximo 120 caracteres."),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
