import { Router } from "express";

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
