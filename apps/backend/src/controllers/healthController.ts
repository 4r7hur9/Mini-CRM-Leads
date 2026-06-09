import type { RequestHandler } from "express";

export const healthCheck: RequestHandler = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "mini-crm-leads-api",
    },
  });
};
