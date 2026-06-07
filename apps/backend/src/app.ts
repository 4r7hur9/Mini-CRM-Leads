import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { generalRateLimiter } from "./middlewares/rateLimitMiddleware";
import { apiRouter } from "./routes/router";
import { AppError } from "./utils/AppError";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser());
app.use(generalRateLimiter);

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "mini-crm-leads-api",
    },
  });
});

app.use("/api/v1", apiRouter);

app.use((req, _res, next) => {
  next(new AppError("NOT_FOUND", `Rota nao encontrada: ${req.method} ${req.path}`, 404));
});

app.use(errorMiddleware);
