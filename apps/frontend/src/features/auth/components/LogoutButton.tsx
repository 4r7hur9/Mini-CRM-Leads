"use client";

/**
 * Componente de autenticacao.
 *
 * Responsavel por acao de logout.
 *
 * Integra store, service, toasts e protecao de sessao.
 */
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { notifyError } from "@/lib/toast";
import { useAuthStore } from "../store/authStore";
import { clearLogoutRedirect, markLogoutRedirect } from "../utils/logoutRedirect";

export function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const status = useAuthStore((state) => state.status);

  async function handleLogout() {
    markLogoutRedirect();

    try {
      await logout();
      router.replace("/login?loggedOut=1");
    } catch (error) {
      clearLogoutRedirect();
      notifyError(error, "Nao foi possivel sair da conta.");
    }
  }

  return (
    <Button
      aria-label="Sair da conta"
      disabled={status === "loading"}
      onClick={handleLogout}
      variant="ghost"
    >
      <LogOut aria-hidden="true" size={18} />
      Sair
    </Button>
  );
}
