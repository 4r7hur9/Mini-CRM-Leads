"use client";

/**
 * Componente visual reutilizavel.
 *
 * Responsavel por viewport global dos toasts.
 *
 * E reutilizado como base visual pelas telas e formularios.
 */
import { ToastContainer } from "react-toastify";

export function ToastViewport() {
  return (
    <ToastContainer
      autoClose={3500}
      closeOnClick
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      position="top-right"
      theme="colored"
    />
  );
}
