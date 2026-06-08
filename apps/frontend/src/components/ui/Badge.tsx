type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "orange" | "red" | "stone" | "teal";
};

const tones = {
  blue: "border-sky-200 bg-sky-50 text-sky-800",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  orange: "border-orange-200 bg-orange-50 text-orange-800",
  red: "border-red-200 bg-red-50 text-red-800",
  stone: "border-stone-200 bg-stone-100 text-stone-700",
  teal: "border-teal-200 bg-teal-50 text-teal-800",
};

export function Badge({ children, tone = "stone" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
