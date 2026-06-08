"use client";

import { X } from "lucide-react";
import { Button } from "./Button";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 px-4 py-6">
      <section className="w-full max-w-2xl rounded-lg border border-stone-200 bg-[var(--surface)] shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
          <h2 className="text-lg font-bold text-stone-950">{title}</h2>
          <Button aria-label="Fechar modal" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden="true" size={18} />
          </Button>
        </header>
        <div className="max-h-[78vh] overflow-y-auto px-5 py-5">{children}</div>
      </section>
    </div>
  );
}
