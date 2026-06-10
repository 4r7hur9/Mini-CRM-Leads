"use client";

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
