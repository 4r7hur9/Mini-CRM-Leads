/**
 * Arquivo TypeScript do projeto.
 *
 * Responsavel por comportamento do Kanban.
 *
 * Mantem a responsabilidade do arquivo separada das camadas vizinhas.
 */
import { expect } from "@playwright/test";
import { test } from "./fixtures/auth.fixture";

const seedLeadName = "Marina Costa";

test.describe("Kanban", () => {
  test("exibe as quatro colunas de status no dashboard", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");

    await expect(page.getByRole("heading", { name: "Funil por status" })).toBeVisible();
    await expect(page.getByTestId("kanban-column-NOVO")).toBeVisible();
    await expect(page.getByTestId("kanban-column-EM_ATENDIMENTO")).toBeVisible();
    await expect(page.getByTestId("kanban-column-PROPOSTA_ENVIADA")).toBeVisible();
    await expect(page.getByTestId("kanban-column-FECHADO")).toBeVisible();
  });

  test("permite mover um lead pelo select no layout mobile e persiste o status", async ({ authenticatedPage: page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const leadCard = page.getByTestId("kanban-card").filter({
      has: page.getByTestId("lead-name").filter({ hasText: seedLeadName }),
    }).first();

    const statusSelect = leadCard.getByTestId("status-select");

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/api/v1/leads/") &&
          response.url().endsWith("/status") &&
          response.request().method() === "PATCH" &&
          response.ok(),
      ),
      statusSelect.selectOption("EM_ATENDIMENTO"),
    ]);

    await expect(statusSelect).toHaveValue("EM_ATENDIMENTO");

    await page.reload();

    const reloadedCard = page.getByTestId("kanban-card").filter({
      has: page.getByTestId("lead-name").filter({ hasText: seedLeadName }),
    }).first();

    await expect(reloadedCard.getByTestId("status-select")).toHaveValue("EM_ATENDIMENTO");
  });
});
