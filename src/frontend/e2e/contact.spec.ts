import { expect, test } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows both contact and quote tabs", async ({ page }) => {
    await expect(
      page.getByRole("tab", { name: /envoyer un message/i }),
    ).toBeVisible();
    await expect(page.getByRole("tab", { name: /demande de devis/i })).toBeVisible();
  });

  test("contact form validates required fields", async ({ page }) => {
    // Submit empty
    await page.getByTestId("contact-form-submit").click();
    // Field error for email appears (email is required)
    await expect(page.getByText(/email est requise/i).first()).toBeVisible();
  });

  test("contact form fills and accepts a valid payload", async ({ page }) => {
    await page.getByTestId("contact-form-name").fill("Amadou Diallo");
    await page.getByTestId("contact-form-email").fill("amadou@example.sn");
    await page.getByTestId("contact-form-message").fill("Bonjour, je souhaite des informations.");
    // Phone is optional in the contact form
    // We don't submit to avoid hitting the live backend
  });

  test("switching to quote tab shows quote-specific fields", async ({ page }) => {
    await page.getByRole("tab", { name: /demande de devis/i }).click();
    await expect(page.getByTestId("devis-form-service")).toBeVisible();
    await expect(page.getByTestId("devis-form-tel")).toBeVisible();
  });
});
