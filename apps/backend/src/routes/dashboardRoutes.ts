import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get("/", dashboardController.getSummary);
