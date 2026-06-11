/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por pagina do dashboard.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { DashboardPageClient } from "@/features/dashboard/components/DashboardPageClient";

export default function DashboardPage() {
  return <DashboardPageClient />;
}
