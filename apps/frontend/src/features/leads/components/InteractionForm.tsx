"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import type { InteractionPayload, InteractionType } from "../types";
import { interactionSchema, type InteractionFormData } from "../validators";

const interactionLabels: Record<InteractionType, string> = {
  LIGACAO: "Ligacao",
  WHATSAPP: "WhatsApp",
  EMAIL: "E-mail",
  REUNIAO: "Reuniao",
  OBSERVACAO: "Observacao",
};

const interactionTypes = Object.keys(interactionLabels) as InteractionType[];

type InteractionFormProps = {
  isSubmitting?: boolean;
  onSubmit: (payload: InteractionPayload) => Promise<void>;
};

export function InteractionForm({ isSubmitting, onSubmit }: InteractionFormProps) {
  const {
    formState: { errors, isSubmitting: formSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<InteractionFormData>({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
      description: "",
      type: "OBSERVACAO",
    },
  });

  async function submit(data: InteractionFormData) {
    await onSubmit(data);
    reset();
  }

  const disabled = Boolean(isSubmitting || formSubmitting);

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(submit)}>
      <SelectField error={errors.type?.message} id="interaction-type" label="Tipo" {...register("type")}>
        {interactionTypes.map((type) => (
          <option key={type} value={type}>
            {interactionLabels[type]}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        error={errors.description?.message}
        id="interaction-description"
        label="Descricao"
        placeholder="Resumo do contato, decisao ou proximo passo"
        {...register("description")}
      />
      <Button disabled={disabled} type="submit">
        <Plus aria-hidden="true" size={18} />
        Registrar interacao
      </Button>
    </form>
  );
}

export { interactionLabels };
