/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por layout protegido do app autenticado.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { AppShell } from "@/components/layout/AppShell";
import { AuthSessionGate } from "@/features/auth/components/AuthSessionGate";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <AuthSessionGate>
      <AppShell>{children}</AppShell>
    </AuthSessionGate>
  );
}
