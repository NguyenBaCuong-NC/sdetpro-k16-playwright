import { test } from "@playwright/test";

test('Link test - XPATH', async ({ page }) => {
    await page.goto("./")

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

