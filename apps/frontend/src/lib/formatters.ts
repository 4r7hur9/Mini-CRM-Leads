/**
 * Formatadores compartilhados.
 *
 * Responsavel pelos formatadores de data, moeda e texto.
 *
 * Concentra formatacoes reutilizadas por componentes e paginas.
 */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));
}
