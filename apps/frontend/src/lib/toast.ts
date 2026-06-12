"use client";

/**
 * Helpers de notificacao visual.
 *
 * Responsavel por helpers de notificacao visual.
 *
 * Encapsula os toasts usados como feedback de sucesso, erro e aviso.
 */
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/services/api";

export function notifySuccess(message: string) {
  toast.success(message);
}

export function notifyError(error: unknown, fallbackMessage?: string) {
  const message = getApiErrorMessage(error);
  toast.error(message || fallbackMessage || "Nao foi possivel concluir a operacao.");
}
