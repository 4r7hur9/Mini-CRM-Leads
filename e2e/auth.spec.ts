/**
 * Arquivo TypeScript do projeto.
 *
 * Responsavel por fluxos de login, cadastro e logout.
 *
 * Mantem a responsabilidade do arquivo separada das camadas vizinhas.
 */
import { expect, test } from "@playwright/test";

const seededUser = {
  email: "admin@teste.com",
  password: "Admin@123",
};

function uniqueEmail(prefix: string) {
  return `${prefix}-${Date.now()}@teste.com`;
}

test.describe("Auth", () => {
  test("register redireciona para /dashboard", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Nome").fill("Usuario E2E");
    await page.getByLabel("E-mail").fill(uniqueEmail("cadastro-e2e"));
    await page.getByLabel("Senha").fill("Admin@123");

    await Promise.all([
      page.waitForURL("**/dashboard"),
      page.getByRole("button", { name: /Criar conta/i }).click(),
    ]);

    await expect(page.getByText("Conta criada com sucesso.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pipeline de leads" })).toBeVisible();
  });

  test("login invalido exibe toast de erro", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("E-mail").fill(seededUser.email);
    await page.getByLabel("Senha").fill("SenhaErrada123");
    await page.getByRole("button", { name: /^Entrar$/i }).click();

    await expect(page.getByText("Credenciais invalidas.")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("login e logout preservam o fluxo da sessao", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("E-mail").fill(seededUser.email);
    await page.getByLabel("Senha").fill(seededUser.password);

    await Promise.all([
      page.waitForURL("**/dashboard"),
      page.getByRole("button", { name: /^Entrar$/i }).click(),
    ]);

    await expect(page.getByText("Login realizado com sucesso.")).toBeVisible();
    await expect(page.getByText("Ola, Admin Teste")).toBeVisible();

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/auth/logout") &&
          response.request().method() === "POST" &&
          response.ok(),
      ),
      page.getByRole("button", { name: /Sair/i }).click(),
    ]);

    await expect(page.getByText("Sessao encerrada com sucesso.")).toBeVisible();
    await expect(page).toHaveURL(/\/login\?loggedOut=1$/);
    await expect(page.getByRole("heading", { name: "Entrar no CRM" })).toBeVisible();
  });
});
