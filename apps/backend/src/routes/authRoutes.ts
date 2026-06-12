/**
 * Rotas da API.
 *
 * Responsavel por rotas de autenticacao.
 *
 * Agrupa os endpoints expostos por app.ts e encaminha para os controllers.
 */
import { Router } from "express";
import * as authController from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authRateLimiter } from "../middlewares/rateLimitMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { loginSchema, registerSchema } from "../validators/authValidator";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  authRateLimiter,
  validate({ body: registerSchema }),
  authController.register,
);

authRoutes.post(
  "/login",
  authRateLimiter,
  validate({ body: loginSchema }),
  authController.login,
);

authRoutes.post("/logout", authController.logout);

authRoutes.get("/me", authMiddleware, authController.me);
