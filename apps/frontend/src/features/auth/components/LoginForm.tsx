"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useAuthStore } from "../store/authStore";
import { loginSchema, type LoginFormData } from "../validators";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const shouldShowSeedHint = process.env.NODE_ENV !== "production";

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data);
      notifySuccess("Login realizado com sucesso.");
      router.replace("/dashboard");
    } catch (error) {
      notifyError(error, "Nao foi possivel entrar no CRM.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoComplete="email"
        error={errors.email?.message}
        id="email"
        label="E-mail"
        placeholder="admin@teste.com"
        type="email"
        {...register("email")}
      />

      <TextField
        autoComplete="current-password"
        error={errors.password?.message}
        id="password"
        label="Senha"
        placeholder="Sua senha"
        type="password"
        {...register("password")}
      />

      <Button className="mt-2 w-full" disabled={isSubmitting} type="submit">
        <ShieldCheck aria-hidden="true" size={18} />
        {isSubmitting ? "Entrando..." : "Entrar"}
        <ArrowRight aria-hidden="true" size={18} />
      </Button>

      {shouldShowSeedHint ? (
        <div className="rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-600">
          <Mail aria-hidden="true" className="mr-2 inline" size={16} />
          Seed Docker: admin@teste.com / Admin@123
        </div>
      ) : null}
    </form>
  );
}
