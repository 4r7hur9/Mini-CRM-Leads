import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import * as userRepository from "../repositories/userRepository";
import type { AuthenticatedUser, AuthResult, AuthUserResponse } from "../types/auth";
import { AppError } from "../utils/AppError";
import type { LoginInput, RegisterInput } from "../validators/authValidator";

const BCRYPT_SALT_ROUNDS = 12;
const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60;

function toAuthUserResponse(user: User): AuthUserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function createAuthToken(user: User): string {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN_SECONDS,
    },
  );
}

/**
 * Registra um novo usuario, garantindo e-mail unico e senha hashada.
 *
 * @param {RegisterInput} data - Dados de cadastro ja validados.
 * @returns {Promise<AuthResult>} Usuario seguro para resposta e JWT assinado.
 * @throws {AppError} CONFLICT se o e-mail ja estiver cadastrado.
 */
export async function register(data: RegisterInput): Promise<AuthResult> {
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new AppError("CONFLICT", "E-mail ja cadastrado.", 409);
  }

  const passwordHash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);
  const user = await userRepository.create({
    name: data.name,
    email: data.email,
    passwordHash,
  });

  return {
    user: toAuthUserResponse(user),
    token: createAuthToken(user),
  };
}

/**
 * Autentica um usuario com e-mail e senha.
 *
 * @param {LoginInput} data - Credenciais ja validadas.
 * @returns {Promise<AuthResult>} Usuario seguro para resposta e JWT assinado.
 * @throws {AppError} UNAUTHORIZED se as credenciais forem invalidas.
 */
export async function login(data: LoginInput): Promise<AuthResult> {
  const invalidCredentialsError = new AppError(
    "UNAUTHORIZED",
    "Credenciais invalidas.",
    401,
  );
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    throw invalidCredentialsError;
  }

  const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordMatches) {
    throw invalidCredentialsError;
  }

  return {
    user: toAuthUserResponse(user),
    token: createAuthToken(user),
  };
}

/**
 * Verifica um JWT e extrai a identidade autenticada.
 *
 * @param {string} token - Token recebido no cookie httpOnly.
 * @returns {AuthenticatedUser} Identidade autenticada extraida do token.
 * @throws {AppError} UNAUTHORIZED se o token estiver ausente, invalido ou expirado.
 */
export function verifyAuthToken(token: string): AuthenticatedUser {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (
      typeof payload !== "object" ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string"
    ) {
      throw new AppError("UNAUTHORIZED", "Token invalido ou expirado.", 401);
    }

    return {
      id: payload.sub,
      email: payload.email,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("UNAUTHORIZED", "Token invalido ou expirado.", 401);
  }
}

/**
 * Busca os dados publicos do usuario autenticado atual.
 *
 * @param {string} userId - ID extraido do JWT validado.
 * @returns {Promise<AuthUserResponse>} Dados publicos do usuario autenticado.
 * @throws {AppError} UNAUTHORIZED se o usuario nao existir mais.
 */
export async function getCurrentUser(userId: string): Promise<AuthUserResponse> {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError("UNAUTHORIZED", "Usuario autenticado nao encontrado.", 401);
  }

  return toAuthUserResponse(user);
}
