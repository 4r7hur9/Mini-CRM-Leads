/**
 * Teste unitario.
 *
 * Responsavel por unidade do servico de lead.
 *
 * Valida a regra de negocio da camada isolada sem dependencias externas.
 */
import { LeadStatus } from "@prisma/client";
import * as leadService from "../../src/services/leadService";
import { prisma } from "../../src/config/database";

async function createUser(email: string) {
  return prisma.user.create({
    data: {
      name: "Usuario Teste",
      email,
      passwordHash: "hash-de-teste",
    },
  });
}

describe("LeadService", () => {
  it("cria lead com userId correto", async () => {
    const user = await createUser("user@example.com");

    const lead = await leadService.create(user.id, {
      name: "Lead Teste",
      email: "lead@example.com",
      status: LeadStatus.NOVO,
    });

    expect(lead.userId).toBe(user.id);
    expect(lead.name).toBe("Lead Teste");
  });

  it("filtra leads por userId", async () => {
    const user = await createUser("user@example.com");
    const otherUser = await createUser("other@example.com");
    await leadService.create(user.id, { name: "Lead do Usuario" });
    await leadService.create(otherUser.id, { name: "Lead de Outro Usuario" });

    const result = await leadService.findAll(user.id, {
      page: 1,
      limit: 20,
    });

    expect(result.meta.total).toBe(1);
    expect(result.leads[0]?.name).toBe("Lead do Usuario");
  });

  it("lanca NOT_FOUND ao acessar lead de outro usuario", async () => {
    const user = await createUser("user@example.com");
    const otherUser = await createUser("other@example.com");
    const lead = await leadService.create(otherUser.id, {
      name: "Lead Privado",
    });

    await expect(leadService.findById(user.id, lead.id)).rejects.toMatchObject({
      code: "NOT_FOUND",
      statusCode: 404,
    });
  });

  it("atualiza status mantendo ownership", async () => {
    const user = await createUser("user@example.com");
    const lead = await leadService.create(user.id, {
      name: "Lead Teste",
      status: LeadStatus.NOVO,
    });

    const updated = await leadService.updateStatus(
      user.id,
      lead.id,
      LeadStatus.FECHADO,
    );

    expect(updated.status).toBe(LeadStatus.FECHADO);
  });
});
