/**
 * Rotas da API.
 *
 * Responsavel por montar `/api/v1`.
 *
 * Agrupa os endpoints expostos por app.ts e encaminha para os controllers.
 */
import { Router } from "express";
import { healthCheck } from "../controllers/healthController";
import { authRoutes } from "./authRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { leadRoutes } from "./leadRoutes";

export const apiRouter = Router();

apiRouter.get("/health", healthCheck);

apiRouter.use("/auth", authRoutes);
apiRouter.use("/leads", leadRoutes);
apiRouter.use("/dashboard", dashboardRoutes);
