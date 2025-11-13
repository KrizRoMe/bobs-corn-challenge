import { test, expect } from "@playwright/test";

test.describe("Buy Corn E2E", () => {
  const baseUrl = "http://localhost:3000";

  test("should buy corn successfully", async ({ page }) => {
    const clientId = `test-client-${Date.now()}`;

    const response = await page.request.post(`${baseUrl}/api/bobs-corn/buy`, {
      headers: { "x-client-id": clientId },
    });

    const body = await response.json();
    console.log("Response body:", body);

    expect(response.status()).toBe(200);
    expect(body.payload).toBeNull();
    expect(body.message).toBe("🌽 Compra exitosa");
  });

  test("should return rate limit error", async ({ page }) => {
    const clientId = `rate-limit-test-${Date.now()}`;

    // First try to buy corn
    const firstResponse = await page.request.post(
      `${baseUrl}/api/bobs-corn/buy`,
      {
        headers: { "x-client-id": clientId },
      },
    );

    expect(firstResponse.status()).toBe(200);

    // Second try to buy corn
    const secondResponse = await page.request.post(
      `${baseUrl}/api/bobs-corn/buy`,
      {
        headers: { "x-client-id": clientId },
      },
    );
    const secondBody = await secondResponse.json();

    expect(secondResponse.status()).toBe(429);
    expect(secondBody.error.message).toContain("Demasiadas peticiones");
  });
});
