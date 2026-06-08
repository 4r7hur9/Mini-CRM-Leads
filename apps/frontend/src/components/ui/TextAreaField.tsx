import type { TextareaHTMLAttributes } from "react";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  label: string;
};

export function TextAreaField({
  error,
  id,
  label,
  className = "",
  ...props
}: TextAreaFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-stone-800" htmlFor={id}>
        {label}
      </label>
      <textarea
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-28 w-full resize-y rounded-md border border-stone-300 bg-white px-3 py-3 text-stone-950 shadow-sm transition placeholder:text-stone-400 focus:border-teal-700 ${className}`}
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
