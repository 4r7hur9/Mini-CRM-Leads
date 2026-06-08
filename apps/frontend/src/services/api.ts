"use client";

import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiErrorResponse } from "@/types/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data.error.message ??
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
      window.location.assign("/login");
    }

    return Promise.reject(error);
  },
);
