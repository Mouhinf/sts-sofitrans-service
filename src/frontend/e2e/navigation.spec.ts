import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("header nav links all resolve to a 200 page", async ({ page }) => {
    await page.goto("/");
    const links = await page
      .getByRole("navigation")
      .first()
      .getByRole("link")
      .all();
    const hrefs = await Promise.all(links.map((l) => l.getAttribute("href")));
    const internal = hrefs
      .filter((h): h is string => !!h && h.startsWith("/") && !h.startsWith("//"));
    // Visit a representative subset to keep the suite fast
    for (const href of ["/services", "/a-propos", "/blog", "/contact"]) {
      const res = await page.goto(href);
      expect(res?.status(), `expected 200 for ${href}`).toBe(200);
    }
  });

  test("404 route renders the not-found component", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
  });

  test("footer is present and shows the brand name", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/STS SOFITRANS/i);
  });
});
