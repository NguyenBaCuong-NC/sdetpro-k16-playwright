import { test } from '@playwright/test';

test('Handle JS popup', async ({ page }) => {
    await page.goto('/javascript_alerts');
    const jsAlertLoc = page.locator("button[onclick='jsAlert()']");

    //Must define event dandler
    page.on('dialog', async dialog => {
        await dialog.accept();
    })

})