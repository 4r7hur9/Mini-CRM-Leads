/**
 * Servico de negocio do backend.
 *
 * Responsavel por chamadas de auth para a API.
 *
 * Faz a ponte entre controllers e repositories, concentrando regras de negocio.
 */
import { api } from "@/services/api";
import type { ApiSuccess } from "@/types/api";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types";

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const response = await api.post<ApiSuccess<AuthUser>>("/auth/register", payload);
  return response.data.data;
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const response = await api.post<ApiSuccess<AuthUser>>("/auth/login", payload);
  return response.data.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<ApiSuccess<AuthUser>>("/auth/me");
  return response.data.data;
}
