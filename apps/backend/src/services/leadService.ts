/**
 * Servico de negocio do backend.
 *
 * Responsavel por chamadas da API para leads.
 *
 * Faz a ponte entre controllers e repositories, concentrando regras de negocio.
 */
import type { Lead, LeadStatus } from "@prisma/client";
import * as leadRepository from "../repositories/leadRepository";
import type { CreateLeadData, LeadListResult, ListLeadFilters, UpdateLeadData } from "../types/lead";
import { AppError } from "../utils/AppError";

function createNotFoundError() {
  return new AppError("NOT_FOUND", "Lead nao encontrado.", 404);
}

/**
 * Cria um novo lead associado ao usuario autenticado.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {CreateLeadData} data - Dados validados do lead.
 * @returns {Promise<Lead>} Lead criado.
 */
export async function create(userId: string, data: CreateLeadData): Promise<Lead> {
  return leadRepository.create(userId, data);
}

/**
 * Lista leads do usuario autenticado com filtros e paginacao.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {ListLeadFilters} filters - Filtros validados de listagem.
 * @returns {Promise<LeadListResult>} Leads e metadados de paginacao.
 */
export async function findAll(
  userId: string,
  filters: ListLeadFilters,
): Promise<LeadListResult> {
  const [leads, total] = await Promise.all([
    leadRepository.findAllByUserId(userId, filters),
    leadRepository.countByUserId(userId, filters),
  ]);

  return {
    leads,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.ceil(total / filters.limit),
    },
  };
}

/**
 * Busca um lead por ID garantindo isolamento por usuario.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} id - ID do lead.
 * @returns {Promise<unknown>} Lead encontrado com interacoes.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function findById(userId: string, id: string) {
  const lead = await leadRepository.findByIdAndUserId(id, userId);

  if (!lead) {
    throw createNotFoundError();
  }

  return lead;
}

/**
 * Atualiza parcialmente um lead garantindo ownership antes da escrita.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} id - ID do lead.
 * @param {UpdateLeadData} data - Campos validados para atualizacao.
 * @returns {Promise<Lead>} Lead atualizado.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function update(
  userId: string,
  id: string,
  data: UpdateLeadData,
): Promise<Lead> {
  await findById(userId, id);

  return leadRepository.update(id, data);
}

/**
 * Atualiza apenas o status de um lead garantindo ownership.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} id - ID do lead.
 * @param {LeadStatus} status - Novo status validado do lead.
 * @returns {Promise<Lead>} Lead com status atualizado.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function updateStatus(
  userId: string,
  id: string,
  status: LeadStatus,
): Promise<Lead> {
  await findById(userId, id);

  return leadRepository.update(id, { status });
}

/**
 * Remove um lead garantindo ownership antes da exclusao.
 *
 * @param {string} userId - ID do usuario autenticado.
 * @param {string} id - ID do lead.
 * @returns {Promise<void>} Resolvido quando o lead for removido.
 * @throws {AppError} NOT_FOUND se o lead nao existir ou pertencer a outro usuario.
 */
export async function remove(userId: string, id: string): Promise<void> {
  await findById(userId, id);
  await leadRepository.remove(id);
}
