"use client";

import axios, { AxiosError } from "axios";
import { getLoginRedirectPath } from "@/features/auth/utils/logoutRedirect";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiErrorResponse } from "@/types/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function getResponseMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  const response = data as {
    error?: {
      message?: unknown;
    };
    message?: unknown;
  };

  if (typeof response.error?.message === "string") {
    return response.error.message;
  }

  if (typeof response.message === "string") {
    return response.message;
  }

  return undefined;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      getResponseMessage(error.response?.data) ??
      "Nao foi possivel concluir a operacao. Tente novamente."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Nao foi possivel concluir a operacao. Tente novamente.";
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      !window.location.pathname.startsWith("/login") &&
      !window.location.pathname.startsWith("/register")
    ) {
      window.location.assign(getLoginRedirectPath());
    }

    return Promise.reject(error);
  },
);
