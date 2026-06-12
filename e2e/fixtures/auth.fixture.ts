/**
 * Arquivo TypeScript do projeto.
 *
 * Responsavel por contexto autenticado reutilizavel.
 *
 * Mantem a responsabilidade do arquivo separada das camadas vizinhas.
 */
import { expect, test as base, type Page } from "@playwright/test";

type AuthFixtures = {
  authenticatedPage: Page;
};

const seedUser = {
  email: "admin@teste.com",
  password: "Admin@123",
};

async function loginWithSeedUser(page: Page) {
  await page.goto("/login");
  await page.getByLabel("E-mail").fill(seedUser.email);
  await page.getByLabel("Senha").fill(seedUser.password);

  await Promise.all([
    page.waitForURL("**/dashboard"),
    page.getByRole("button", { name: /^Entrar$/i }).click(),
  ]);

  await expect(page.getByRole("heading", { name: "Pipeline de leads" })).toBeVisible();
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await loginWithSeedUser(page);
    await use(page);
  },
});

export { expect, loginWithSeedUser };
