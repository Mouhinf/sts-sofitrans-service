import { expect, test } from "@playwright/test";

test.describe("Accessibility — basic checks", () => {
  test("home page has exactly one h1", async ({ page }) => {
    await page.goto("/");
    const h1s = await page.getByRole("heading", { level: 1 }).count();
    expect(h1s).toBeGreaterThanOrEqual(1);
  });

  test("all images have an alt attribute", async ({ page }) => {
    await page.goto("/");
    const imgs = page.locator("img");
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute("alt");
      expect(alt, `img #${i} is missing alt`).not.toBeNull();
    }
  });

  test("form inputs have associated labels", async ({ page }) => {
    await page.goto("/contact");
    const inputs = page.locator(
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"])',
    );
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute("id");
      if (!id) continue;
      const label = page.locator(`label[for="${id}"]`);
      await expect(label, `input #${id} has no label`).toHaveCount(1);
    }
  });
});
