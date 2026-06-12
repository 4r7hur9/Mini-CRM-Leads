/**
 * Teste de integracao.
 *
 * Responsavel por integracao de leads.
 *
 * Valida o fluxo com app, Prisma e banco de teste reais.
 */
import { LeadStatus } from "@prisma/client";
import { createAuthenticatedAgent } from "../helpers/factories";

describe("Leads API", () => {
  it("POST /leads retorna 401 sem autenticacao", async () => {
    const { agent } = await createAuthenticatedAgent();

    await agent.post("/api/v1/auth/logout");
    const response = await agent.post("/api/v1/leads").send({
      name: "Lead Sem Sessao",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("UNAUTHORIZED");
  });

  it("POST /leads cria lead com dados validos", async () => {
    const { agent } = await createAuthenticatedAgent();

    const response = await agent.post("/api/v1/leads").send({
      name: "Lead Valido",
      email: "lead@example.com",
      status: LeadStatus.NOVO,
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Lead Valido");
    expect(response.body.data.userId).toEqual(expect.any(String));
  });

  it("GET /leads lista apenas leads do usuario autenticado", async () => {
    const first = await createAuthenticatedAgent();
    const second = await createAuthenticatedAgent();

    await first.agent.post("/api/v1/leads").send({ name: "Lead Primeiro" });
    await second.agent.post("/api/v1/leads").send({ name: "Lead Segundo" });

    const response = await first.agent.get("/api/v1/leads");

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBe(1);
    expect(response.body.data[0].name).toBe("Lead Primeiro");
  });

  it("GET /leads/:id retorna 404 para lead de outro usuario", async () => {
    const first = await createAuthenticatedAgent();
    const second = await createAuthenticatedAgent();
    const created = await second.agent.post("/api/v1/leads").send({
      name: "Lead Privado",
    });

    const response = await first.agent.get(`/api/v1/leads/${created.body.data.id}`);

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("PATCH /leads/:id/status atualiza status do proprio lead", async () => {
    const { agent } = await createAuthenticatedAgent();
    const created = await agent.post("/api/v1/leads").send({
      name: "Lead Kanban",
      status: LeadStatus.NOVO,
    });

    const response = await agent
      .patch(`/api/v1/leads/${created.body.data.id}/status`)
      .send({ status: LeadStatus.PROPOSTA_ENVIADA });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(LeadStatus.PROPOSTA_ENVIADA);
  });

  it("DELETE /leads/:id remove lead proprio", async () => {
    const { agent } = await createAuthenticatedAgent();
    const created = await agent.post("/api/v1/leads").send({
      name: "Lead Removivel",
    });

    const removed = await agent.delete(`/api/v1/leads/${created.body.data.id}`);
    const getAfterDelete = await agent.get(`/api/v1/leads/${created.body.data.id}`);

    expect(removed.status).toBe(200);
    expect(removed.body.data.message).toBe("Lead removido");
    expect(getAfterDelete.status).toBe(404);
  });
});
