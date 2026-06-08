type MetricCardProps = {
  label: string;
  value: number | string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm">
      <p className="text-sm font-semibold text-stone-500">{label}</p>
      <strong className="mt-3 block text-3xl font-black text-stone-950">{value}</strong>
    </article>
  );
}
