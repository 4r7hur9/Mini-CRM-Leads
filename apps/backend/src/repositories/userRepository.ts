/**
 * Repositorio de dados.
 *
 * Responsavel por acesso aos usuarios.
 *
 * Isola o acesso ao Prisma e ao banco PostgreSQL.
 */
import type { User } from "@prisma/client";
import { prisma } from "../config/database";

type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

/**
 * Busca um usuario pelo e-mail unico cadastrado.
 *
 * @param {string} email - E-mail normalizado do usuario.
 * @returns {Promise<User | null>} Usuario encontrado ou null.
 */
export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Busca um usuario pelo identificador primario.
 *
 * @param {string} id - ID do usuario autenticado.
 * @returns {Promise<User | null>} Usuario encontrado ou null.
 */
export async function findById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Cria um novo usuario com senha previamente hashada.
 *
 * @param {CreateUserData} data - Dados validados e senha em formato hash.
 * @returns {Promise<User>} Usuario criado no banco.
 */
export async function create(data: CreateUserData): Promise<User> {
  return prisma.user.create({
    data,
  });
}
