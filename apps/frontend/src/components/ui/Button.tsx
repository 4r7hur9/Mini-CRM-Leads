/**
 * Componente visual reutilizavel.
 *
 * Responsavel por botao padrao do sistema.
 *
 * E reutilizado como base visual pelas telas e formularios.
 */
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "icon";
  variant?: "danger" | "primary" | "secondary" | "ghost";
};

const variants = {
  danger: "bg-red-700 text-white hover:bg-red-800",
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "bg-stone-900 text-white hover:bg-stone-800",
  ghost: "bg-transparent text-stone-700 hover:bg-stone-100",
};

const sizes = {
  sm: "min-h-9 px-3 py-1.5 text-xs",
  md: "min-h-11 px-4 py-2 text-sm",
  icon: "h-10 w-10 p-0",
};

export function Button({
  className = "",
  size = "md",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${sizes[size]} ${variants[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}
