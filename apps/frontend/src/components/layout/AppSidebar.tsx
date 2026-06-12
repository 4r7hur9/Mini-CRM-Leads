"use client";

/**
 * Componente de layout.
 *
 * Responsavel por menu lateral da area autenticada.
 *
 * Estrutura a area autenticada e organiza a navegacao do app.
 */
import { BarChart3, ContactRound, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/leads", icon: ContactRound, label: "Leads" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 rounded-lg border border-stone-200 bg-[var(--surface)] p-4 shadow-sm lg:block">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="grid h-11 w-11 place-items-center rounded-md bg-teal-700 text-white">
          <BarChart3 aria-hidden="true" size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-teal-700">Mini CRM</p>
          <p className="font-bold text-stone-950">Leads</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                active
                  ? "bg-teal-700 text-white"
                  : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
              }`}
              href={link.href}
              key={link.href}
            >
              <Icon aria-hidden="true" size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
