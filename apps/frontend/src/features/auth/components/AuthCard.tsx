/**
 * Componente de autenticacao.
 *
 * Responsavel por card visual para login e cadastro.
 *
 * Integra store, service, toasts e protecao de sessao.
 */
import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  description: string;
  footerHref: string;
  footerLabel: string;
  footerText: string;
  title: string;
};

export function AuthCard({
  children,
  description,
  footerHref,
  footerLabel,
  footerText,
  title,
}: AuthCardProps) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-[var(--surface)] p-6 shadow-xl shadow-stone-900/10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-normal text-teal-700">
            Mini CRM de Leads
          </p>
          <h1 className="mt-3 text-3xl font-bold text-stone-950">{title}</h1>
          <p className="mt-3 leading-6 text-stone-600">{description}</p>
        </div>
        {children}
        <p className="mt-6 text-center text-sm text-stone-600">
          {footerText}{" "}
          <Link className="font-semibold text-teal-700 hover:text-teal-900" href={footerHref}>
            {footerLabel}
          </Link>
        </p>
      </section>
    </main>
  );
}
