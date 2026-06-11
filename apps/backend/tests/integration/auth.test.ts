/**
 * Teste de integracao.
 *
 * Responsavel por integracao dos fluxos de auth.
 *
 * Valida o fluxo com app, Prisma e banco de teste reais.
 */
import request from "supertest";
import { app } from "../../src/app";

describe("Auth API", () => {
  it("POST /auth/register cria usuario e define cookie httpOnly", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "Arthur Teste",
      email: "arthur@example.com",
      password: "Senha@123",
    });

    const rawSetCookie = response.headers["set-cookie"];
    const setCookie = Array.isArray(rawSetCookie)
      ? rawSetCookie.join(";")
      : rawSetCookie;

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe("arthur@example.com");
    expect(response.body.data.passwordHash).toBeUndefined();
    expect(setCookie).toContain("HttpOnly");
  });

  it("POST /auth/register retorna CONFLICT para e-mail duplicado", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Arthur Teste",
      email: "arthur@example.com",
      password: "Senha@123",
    });

    const response = await request(app).post("/api/v1/auth/register").send({
      name: "Arthur Duplicado",
      email: "arthur@example.com",
      password: "Senha@123",
    });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("CONFLICT");
  });

  it("POST /auth/login autentica e GET /auth/me retorna usuario atual", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/auth/register").send({
      name: "Arthur Teste",
      email: "arthur@example.com",
      password: "Senha@123",
    });

    const login = await agent.post("/api/v1/auth/login").send({
      email: "arthur@example.com",
      password: "Senha@123",
    });
    const me = await agent.get("/api/v1/auth/me");

    expect(login.status).toBe(200);
    expect(me.status).toBe(200);
    expect(me.body.data.email).toBe("arthur@example.com");
  });

  it("POST /auth/login retorna UNAUTHORIZED com credenciais invalidas", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "nao-existe@example.com",
      password: "Senha@123",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("UNAUTHORIZED");
    expect(response.body.error.message).toBe("Credenciais invalidas.");
  });
});
