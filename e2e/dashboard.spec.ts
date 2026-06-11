/**
 * Arquivo TypeScript do projeto.
 *
 * Responsavel por cenarios do dashboard.
 *
 * Mantem a responsabilidade do arquivo separada das camadas vizinhas.
 */
import { expect } from "@playwright/test";
import { test } from "./fixtures/auth.fixture";

test.describe("Dashboard", () => {
  test("carrega metricas, kanban e recentes", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");

    await expect(page.getByRole("heading", { name: "Pipeline de leads" })).toBeVisible();
    await expect(page.getByText("Total de leads")).toBeVisible();
    await expect(page.getByText("Interacoes registradas")).toBeVisible();
    await expect(page.getByText("Fechados")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Funil por status" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Distribuicao" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recentes" })).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Marina Costa|Rafael Almeida|Camila Rocha|Bruno Martins/ }).first(),
    ).toBeVisible();
  });
});
