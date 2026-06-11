/**
 * Rotas da API.
 *
 * Responsavel por rotas de interacao aninhadas no lead.
 *
 * Agrupa os endpoints expostos por app.ts e encaminha para os controllers.
 */
import { Router } from "express";
import * as interactionController from "../controllers/interactionController";
import { validate } from "../middlewares/validationMiddleware";
import {
  createInteractionSchema,
  interactionParamsSchema,
  leadInteractionParamsSchema,
} from "../validators/interactionValidator";

export const interactionRoutes = Router({ mergeParams: true });

interactionRoutes.post(
  "/",
  validate({ params: leadInteractionParamsSchema, body: createInteractionSchema }),
  interactionController.create,
);

interactionRoutes.get(
  "/",
  validate({ params: leadInteractionParamsSchema }),
  interactionController.getAll,
);

interactionRoutes.delete(
  "/:interactionId",
  validate({ params: interactionParamsSchema }),
  interactionController.remove,
);
