"use client";

import { useAuthStore } from "../store/authStore";

export function UserGreeting() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <p className="text-sm text-stone-500">Sessao ativa</p>
      <h1 className="text-2xl font-bold text-stone-950">
        {user ? `Ola, ${user.name}` : "Mini CRM de Leads"}
      </h1>
    </div>
  );
}
