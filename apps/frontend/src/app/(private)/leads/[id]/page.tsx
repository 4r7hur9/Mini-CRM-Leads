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
