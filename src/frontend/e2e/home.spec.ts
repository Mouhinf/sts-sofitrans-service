import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the hero, services grid and CTAs", async ({ page }) => {
    await page.goto("/");

    // Brand identity
    await expect(page).toHaveTitle(/STS SOFITRANS/i);

    // Hero CTA
    const heroCta = page.getByRole("link", { name: /découvrir nos services/i }).first();
    await expect(heroCta).toBeVisible();

    // Services section
    await expect(page.getByRole("heading", { name: /nos services/i })).toBeVisible();

    // Navigation present
    await expect(page.getByRole("navigation").first()).toBeVisible();
  });

  test("skip-to-content link works", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /aller au contenu principal/i });
    await expect(skipLink).toBeFocused();
  });

  test("language and copy are in French", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").textContent();
    expect(text).toMatch(/[Dd]akar/);
    expect(text).not.toMatch(/\bHello\b/);
  });
});
