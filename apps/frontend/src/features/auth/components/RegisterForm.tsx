"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useAuthStore } from "../store/authStore";
import { registerSchema, type RegisterFormData } from "../validators";

export function RegisterForm() {
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerUser(data);
      notifySuccess("Conta criada com sucesso.");
      router.replace("/dashboard");
    } catch (error) {
      notifyError(error, "Nao foi possivel criar a conta.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoComplete="name"
        error={errors.name?.message}
        id="name"
        label="Nome"
        placeholder="Arthur Bruno"
        type="text"
        {...register("name")}
      />

      <TextField
        autoComplete="email"
        error={errors.email?.message}
        id="email"
        label="E-mail"
        placeholder="voce@email.com"
        type="email"
        {...register("email")}
      />

      <TextField
        autoComplete="new-password"
        error={errors.password?.message}
        id="password"
        label="Senha"
        placeholder="No minimo 8 caracteres"
        type="password"
        {...register("password")}
      />

      <Button className="mt-2 w-full" disabled={isSubmitting} type="submit">
        <UserPlus aria-hidden="true" size={18} />
        {isSubmitting ? "Criando conta..." : "Criar conta"}
        <ArrowRight aria-hidden="true" size={18} />
      </Button>
    </form>
  );
}
