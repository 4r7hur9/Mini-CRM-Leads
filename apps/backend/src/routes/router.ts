import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { leadRoutes } from "./leadRoutes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "mini-crm-leads-api",
    },
  });
});

apiRouter.use("/auth", authRoutes);
apiRouter.use("/leads", leadRoutes);
apiRouter.use("/dashboard", dashboardRoutes);
