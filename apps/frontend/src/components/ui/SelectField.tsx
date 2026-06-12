/**
 * Componente visual reutilizavel.
 *
 * Responsavel por select estilizado.
 *
 * E reutilizado como base visual pelas telas e formularios.
 */
import type { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  label: string;
};

export function SelectField({ children, error, id, label, className = "", ...props }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-stone-800" htmlFor={id}>
        {label}
      </label>
      <select
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-950 shadow-sm transition focus:border-teal-700 ${className}`}
        id={id}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p className="text-sm text-red-700" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
