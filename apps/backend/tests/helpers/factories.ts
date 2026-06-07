import { LeadStatus } from "@prisma/client";
import request from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/config/database";

type TestUserData = {
  name?: string;
  email?: string;
  password?: string;
};

export async function createTestUser(data: TestUserData = {}) {
  const email = data.email ?? `user-${crypto.randomUUID()}@example.com`;
  const password = data.password ?? "Senha@123";

  const response = await request(app).post("/api/v1/auth/register").send({
    name: data.name ?? "Usuario Teste",
    email,
    password,
  });

  return {
    email,
    password,
    user: response.body.data,
  };
}

export async function createAuthenticatedAgent(data: TestUserData = {}) {
  const agent = request.agent(app);
  const email = data.email ?? `agent-${crypto.randomUUID()}@example.com`;
  const password = data.password ?? "Senha@123";

  const response = await agent.post("/api/v1/auth/register").send({
    name: data.name ?? "Usuario Autenticado",
    email,
    password,
  });

  return {
    agent,
    email,
    password,
    user: response.body.data,
  };
}

export async function createLeadForUser(userId: string) {
  return prisma.lead.create({
    data: {
      userId,
      name: `Lead ${crypto.randomUUID()}`,
      email: `lead-${crypto.randomUUID()}@example.com`,
      company: "Empresa Teste",
      status: LeadStatus.NOVO,
    },
  });
}
