import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      description="Entre para acompanhar leads, proximos contatos e status do funil."
      footerHref="/register"
      footerLabel="Criar uma conta"
      footerText="Ainda nao tem acesso?"
      title="Entrar no CRM"
    >
      <LoginForm />
    </AuthCard>
  );
}
