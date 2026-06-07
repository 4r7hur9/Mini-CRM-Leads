import type { InteractionType } from "@prisma/client";

export type CreateInteractionData = {
  type: InteractionType;
  description: string;
};
