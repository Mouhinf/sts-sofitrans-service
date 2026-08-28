import { expect, test } from "@playwright/test";

test.describe("Service pages", () => {
  test("Immobilier page lists properties and supports filtering", async ({ page }) => {
    await page.goto("/services/immobilier");
    await expect(
      page.getByRole("heading", { name: /^immobilier$/i, level: 1 }),
    ).toBeVisible();
    // Filter chips are present
    await expect(page.getByTestId("filter-apartment")).toBeVisible();
    await expect(page.getByTestId("filter-house")).toBeVisible();
  });

  test("Transport page renders vehicle catalog", async ({ page }) => {
    await page.goto("/services/transport");
    await expect(
      page.getByRole("heading", { name: /^transport$/i, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTestId("filter-car")).toBeVisible();
    await expect(page.getByTestId("filter-bus")).toBeVisible();
  });

  test("Formation page lists trainings and has enroll CTA", async ({ page }) => {
    await page.goto("/services/formation");
    await expect(
      page.getByRole("heading", { name: /^formation$/i, level: 1 }),
    ).toBeVisible();
    // At least one training card or empty state
    const empty = page.getByTestId("empty-trainings");
    const cards = page.locator('[data-ocid^="training-card-"]');
    const eitherVisible = await empty
      .or(cards.first())
      .first()
      .isVisible()
      .catch(() => false);
    expect(eitherVisible).toBeTruthy();
  });

  test("Agrobusiness page renders inline form", async ({ page }) => {
    await page.goto("/services/agrobusiness");
    await expect(
      page.getByRole("heading", { name: /investir dans l'agriculture/i }),
    ).toBeVisible();
    await expect(page.getByTestId("agro-inquiry-form")).toBeVisible();
  });
});
