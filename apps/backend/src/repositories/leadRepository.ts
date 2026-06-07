import type { Lead, Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import type { CreateLeadData, ListLeadFilters, UpdateLeadData } from "../types/lead";

function buildLeadWhere(userId: string, filters?: Partial<ListLeadFilters>): Prisma.LeadWhereInput {
  const search = filters?.search?.trim();

  return {
    userId,
    ...(filters?.status ? { status: filters.status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { company: { contains: search } },
          ],
        }
      : {}),
  };
}

/**
 * Lista leads pertencentes ao usuario autenticado com filtros e paginacao.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {ListLeadFilters} filters - Filtros validados de busca, status e pagina.
 * @returns {Promise<Lead[]>} Leads do usuario dentro da pagina solicitada.
 */
export async function findAllByUserId(
  userId: string,
  filters: ListLeadFilters,
): Promise<Lead[]> {
  return prisma.lead.findMany({
    where: buildLeadWhere(userId, filters),
    orderBy: { createdAt: "desc" },
    skip: (filters.page - 1) * filters.limit,
    take: filters.limit,
  });
}

/**
 * Conta leads pertencentes ao usuario autenticado usando os mesmos filtros da lista.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {Partial<ListLeadFilters>} filters - Filtros validados de busca e status.
 * @returns {Promise<number>} Total de leads encontrados.
 */
export async function countByUserId(
  userId: string,
  filters: Partial<ListLeadFilters>,
): Promise<number> {
  return prisma.lead.count({
    where: buildLeadWhere(userId, filters),
  });
}

/**
 * Busca um lead por ID garantindo que ele pertence ao usuario autenticado.
 *
 * @param {string} id - ID do lead.
 * @param {string} userId - ID do usuario autenticado.
 * @returns {Promise<Lead | null>} Lead encontrado ou null.
 */
export async function findByIdAndUserId(id: string, userId: string) {
  return prisma.lead.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      interactions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

/**
 * Cria um lead associado ao usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {CreateLeadData} data - Dados validados do lead.
 * @returns {Promise<Lead>} Lead criado.
 */
export async function create(userId: string, data: CreateLeadData): Promise<Lead> {
  return prisma.lead.create({
    data: {
      ...data,
      userId,
    },
  });
}

/**
 * Atualiza um lead existente apos validacao previa de ownership.
 *
 * @param {string} id - ID do lead.
 * @param {UpdateLeadData} data - Campos validados para atualizacao parcial.
 * @returns {Promise<Lead>} Lead atualizado.
 */
export async function update(id: string, data: UpdateLeadData): Promise<Lead> {
  return prisma.lead.update({
    where: { id },
    data,
  });
}

/**
 * Remove um lead existente apos validacao previa de ownership.
 *
 * @param {string} id - ID do lead.
 * @returns {Promise<Lead>} Lead removido.
 */
export async function remove(id: string): Promise<Lead> {
  return prisma.lead.delete({
    where: { id },
  });
}
