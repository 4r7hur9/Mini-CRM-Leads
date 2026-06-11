/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por pagina da lista de leads.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { LeadsPageClient } from "@/features/leads/components/LeadsPageClient";

export default function LeadsPage() {
  return <LeadsPageClient />;
}
