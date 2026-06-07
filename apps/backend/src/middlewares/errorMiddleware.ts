import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Dados invalidos.",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma error:", {
      code: error.code,
      meta: error.meta,
    });

    return res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Erro ao processar requisicao.",
      },
    });
  }

  console.error("Unexpected error:", error);

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Erro interno nao tratado.",
      ...(env.NODE_ENV === "development" && error instanceof Error
        ? { details: [{ field: "stack", message: error.stack ?? error.message }] }
        : {}),
    },
  });
};
