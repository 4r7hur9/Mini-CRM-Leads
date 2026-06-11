/**
 * Componente visual reutilizavel.
 *
 * Responsavel por indicador de carregamento.
 *
 * E reutilizado como base visual pelas telas e formularios.
 */
type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Carregando" }: SpinnerProps) {
  return (
    <div className="flex min-h-32 items-center justify-center gap-3 text-stone-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-teal-700" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
