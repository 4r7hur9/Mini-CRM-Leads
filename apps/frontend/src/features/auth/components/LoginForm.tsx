"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { getApiErrorMessage } from "@/services/api";
import { useAuthStore } from "../store/authStore";
import { loginSchema, type LoginFormData } from "../validators";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);

    try {
      await login(data);
      router.replace("/dashboard");
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      {formError ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {formError}
        </div>
      ) : null}

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

      <div className="rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-600">
        <Mail aria-hidden="true" className="mr-2 inline" size={16} />
        Seed Docker: admin@teste.com / Admin@123
      </div>
    </form>
  );
}
