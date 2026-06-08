import { AuthCard } from "@/features/auth/components/AuthCard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      description="Crie seu acesso para iniciar a gestao dos seus leads em um funil simples."
      footerHref="/login"
      footerLabel="Entrar"
      footerText="Ja tem uma conta?"
      title="Criar conta"
    >
      <RegisterForm />
    </AuthCard>
  );
}
