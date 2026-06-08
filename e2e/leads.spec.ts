import { expect, type Page } from "@playwright/test";
import { test } from "./fixtures/auth.fixture";

function uniqueLeadName(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

function getLeadCard(page: Page, leadName: string) {
  return page.locator("article").filter({
    has: page.getByRole("link", { name: leadName }),
  }).first();
}

async function createLead(page: Page, leadName: string) {
  const companyName = `Origem ${leadName}`;

  await page.goto("/leads");
  await page.getByRole("button", { name: "Novo lead" }).click();
  await page.getByLabel("Nome").fill(leadName);
  await page.getByLabel("E-mail").fill(`${leadName.toLowerCase().replace(/\s+/g, "-")}@teste.com`);
  await page.getByLabel("Telefone").fill("(11) 99999-0000");
  await page.getByLabel("Empresa ou origem").fill(companyName);
  await page.getByLabel("Observacoes").fill("Lead criado automaticamente pelo Playwright.");
  await page.getByRole("button", { name: "Criar lead" }).click();

  const leadCard = getLeadCard(page, leadName);
  await expect(leadCard).toBeVisible();

  return { companyName, leadCard };
}

test.describe("Leads", () => {
  test("criar lead faz o item aparecer na lista", async ({ authenticatedPage: page }) => {
    const leadName = uniqueLeadName("Lead E2E");
    const { companyName, leadCard } = await createLead(page, leadName);

    await expect(leadCard.getByRole("link", { name: leadName })).toBeVisible();
    await expect(leadCard.getByText(companyName)).toBeVisible();
  });

  test("editar lead atualiza os dados do card", async ({ authenticatedPage: page }) => {
    const leadName = uniqueLeadName("Lead Editar E2E");
    const updatedCompany = "Empresa Atualizada E2E";

    await createLead(page, leadName);

    const leadCard = getLeadCard(page, leadName);

    await leadCard.getByRole("button", { name: "Editar" }).click();
    await page.getByLabel("Empresa ou origem").fill(updatedCompany);
    await page.getByRole("button", { name: "Salvar lead" }).click();

    await expect(leadCard.getByText(updatedCompany)).toBeVisible();
  });

  test("detalhe permite registrar interacao e excluir o lead", async ({ authenticatedPage: page }) => {
    const leadName = uniqueLeadName("Lead Detalhe E2E");
    const interactionDescription = `Interacao criada em ${Date.now()}`;

    await createLead(page, leadName);
    await page.getByRole("link", { name: leadName }).click();

    await expect(page.getByRole("heading", { name: leadName })).toBeVisible();

    await page.getByLabel("Descricao").fill(interactionDescription);
    await page.getByRole("button", { name: "Registrar interacao" }).click();

    await expect(page.getByText(interactionDescription)).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());

    await Promise.all([
      page.waitForURL("**/leads"),
      page.getByRole("button", { name: /Excluir/i }).first().click(),
    ]);

    await expect(page.getByRole("link", { name: leadName })).toHaveCount(0);
  });
});
