/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por pagina de login.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    loggedOut?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const loggedOut = Array.isArray(params.loggedOut) ? params.loggedOut[0] : params.loggedOut;

  return (
    <AuthCard
      description="Entre para acompanhar leads, proximos contatos e status do funil."
      footerHref="/register"
      footerLabel="Criar uma conta"
      footerText="Ainda nao tem acesso?"
      title="Entrar no CRM"
    >
      {loggedOut === "1" ? (
        <p
          aria-live="polite"
          className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"
          role="status"
        >
          Sessao encerrada com sucesso.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  );
}
