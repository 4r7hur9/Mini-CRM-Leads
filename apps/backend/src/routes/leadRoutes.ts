import { Router } from "express";
import * as leadController from "../controllers/leadController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { interactionRoutes } from "./interactionRoutes";
import {
  createLeadSchema,
  leadIdParamsSchema,
  listLeadsQuerySchema,
  updateLeadSchema,
  updateLeadStatusSchema,
} from "../validators/leadValidator";

export const leadRoutes = Router();

leadRoutes.use(authMiddleware);

leadRoutes.post("/", validate({ body: createLeadSchema }), leadController.create);
leadRoutes.get("/", validate({ query: listLeadsQuerySchema }), leadController.getAll);
leadRoutes.use("/:leadId/interactions", interactionRoutes);
leadRoutes.patch(
  "/:id/status",
  validate({ params: leadIdParamsSchema, body: updateLeadStatusSchema }),
  leadController.updateStatus,
);
leadRoutes.get("/:id", validate({ params: leadIdParamsSchema }), leadController.getById);
leadRoutes.put(
  "/:id",
  validate({ params: leadIdParamsSchema, body: updateLeadSchema }),
  leadController.update,
);
leadRoutes.delete("/:id", validate({ params: leadIdParamsSchema }), leadController.remove);
