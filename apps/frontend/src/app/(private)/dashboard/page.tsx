import { BarChart3, ContactRound, LockKeyhole, Workflow } from "lucide-react";

const cards = [
  {
    title: "Autenticacao",
    description: "Cookie httpOnly ativo, sessao recuperada no refresh e logout funcional.",
    icon: LockKeyhole,
  },
  {
    title: "Cliente API",
    description: "Axios centralizado com credenciais e tratamento global de 401.",
    icon: Workflow,
  },
  {
    title: "Proxima fase",
    description: "As telas reais de leads, dashboard visual e responsividade entram na Etapa 9.",
    icon: BarChart3,
  },
];

export default function DashboardPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-normal text-teal-700">Etapa 8</p>
        <h2 className="mt-3 text-3xl font-bold text-stone-950">
          Base autenticada pronta para as features do CRM.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-stone-600">
          Esta area privada confirma o fluxo de registro, login, recuperacao de sessao e logout.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              className="rounded-lg border border-stone-200 bg-[var(--surface)] p-5 shadow-sm"
              key={card.title}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                <Icon aria-hidden="true" size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-950">{card.title}</h3>
              <p className="mt-2 leading-6 text-stone-600">{card.description}</p>
            </article>
          );
        })}
      </div>

      <div className="rounded-lg border border-orange-200 bg-orange-50 p-5 text-orange-950">
        <ContactRound aria-hidden="true" className="mb-3" size={24} />
        <h3 className="font-bold">Credencial seed</h3>
        <p className="mt-1 text-sm">admin@teste.com / Admin@123</p>
      </div>
    </section>
  );
}
