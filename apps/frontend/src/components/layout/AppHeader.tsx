"use client";

/**
 * Componente de layout.
 *
 * Responsavel por topo com navegacao e logout.
 *
 * Estrutura a area autenticada e organiza a navegacao do app.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { UserGreeting } from "@/features/auth/components/UserGreeting";

const mobileLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="rounded-lg border border-stone-200 bg-[var(--surface)] px-4 py-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <UserGreeting />
        <div className="flex items-center gap-2">
          <LogoutButton />
        </div>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
        {mobileLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold ${
                active ? "bg-teal-700 text-white" : "bg-stone-100 text-stone-700"
              }`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
