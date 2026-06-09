import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { healthCheck } from "./controllers/healthController";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { generalRateLimiter } from "./middlewares/rateLimitMiddleware";
import { apiRouter } from "./routes/router";
import { AppError } from "./utils/AppError";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.CORS_ORIGIN.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new AppError("FORBIDDEN", "Origem nao permitida pelo CORS.", 403));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser());
app.use(generalRateLimiter);

app.get("/health", healthCheck);

app.use("/api/v1", apiRouter);

app.use((req, _res, next) => {
  next(new AppError("NOT_FOUND", `Rota nao encontrada: ${req.method} ${req.path}`, 404));
});

app.use(errorMiddleware);
