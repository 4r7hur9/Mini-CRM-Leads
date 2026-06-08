"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "../store/authStore";

export function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const status = useAuthStore((state) => state.status);

  async function handleLogout() {
    await logout();
    router.replace("/login");
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
