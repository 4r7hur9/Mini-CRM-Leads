"use client";

/**
 * Componente de autenticacao.
 *
 * Responsavel por estado global de autenticacao.
 *
 * Integra store, service, toasts e protecao de sessao.
 */
import { create } from "zustand";
import * as authService from "../services/authService";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  loadCurrentUser: () => Promise<AuthUser | null>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  error: null,

  async login(payload) {
    set({ status: "loading", error: null });
    const user = await authService.login(payload);
    set({ user, status: "authenticated", error: null });
    return user;
  },

  async register(payload) {
    set({ status: "loading", error: null });
    const user = await authService.register(payload);
    set({ user, status: "authenticated", error: null });
    return user;
  },

  async logout() {
    set({ status: "loading", error: null });
    await authService.logout();
    set({ user: null, status: "unauthenticated", error: null });
  },

  async loadCurrentUser() {
    set({ status: "loading", error: null });

    try {
      const user = await authService.getCurrentUser();
      set({ user, status: "authenticated", error: null });
      return user;
    } catch (error) {
      set({ user: null, status: "unauthenticated", error: null });
      return null;
    }
  },

  clearError() {
    set({ error: null });
  },
}));
