/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por pagina de detalhe do lead.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { LeadDetailPageClient } from "@/features/leads/components/LeadDetailPageClient";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  return <LeadDetailPageClient leadId={id} />;
}
