/**
 * Rotas da API.
 *
 * Responsavel por rotas do dashboard.
 *
 * Agrupa os endpoints expostos por app.ts e encaminha para os controllers.
 */
import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get("/", dashboardController.getSummary);
