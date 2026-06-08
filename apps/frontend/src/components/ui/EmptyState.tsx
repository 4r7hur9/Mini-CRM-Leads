type EmptyStateProps = {
  action?: React.ReactNode;
  description: string;
  title: string;
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-8 text-center">
      <h3 className="text-lg font-bold text-stone-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md leading-6 text-stone-600">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
