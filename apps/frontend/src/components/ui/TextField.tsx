/**
 * Componente visual reutilizavel.
 *
 * Responsavel por campo de texto padrao.
 *
 * E reutilizado como base visual pelas telas e formularios.
 */
import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ id, label, error, className = "", ...props }: TextFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-stone-800" htmlFor={id}>
        {label}
      </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-950 shadow-sm transition placeholder:text-stone-400 focus:border-teal-700 ${className}`}
        id={id}
        {...props}
      />
      {error ? (
        <p className="text-sm text-red-700" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
