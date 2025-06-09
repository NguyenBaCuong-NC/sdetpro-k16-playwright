import { test, expect, Locator } from "@playwright/test";
import { clickAndWaitForNewTab } from "../../utils/clickAndWaitForNewTabUtil";

test('Click, wait for and close new tab test', async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    // await page.click('a[target="_blank"]');
    const externalLinks: Locator = page.locator('a[target="_blank"]');
    const externalLinkCount: number = await externalLinks.count();
    const expectedUrls = [
        'https://www.facebook.com/nopCommerce',
        'https://x.com/nopCommerce',
        'https://www.youtube.com/user/nopCommerce',
        // 'https://plus.google.com/+nopcommerce'
    ];

    // externalLinkCount - 1 do 'https://plus.google.com/+nopcommerce' ko load dc
    for (let i = 0; i < externalLinkCount - 1; i++) {
        const newTab = await clickAndWaitForNewTab(page, externalLinks, i)
        await expect(newTab).toHaveURL(expectedUrls[i]);
        await newTab.close();
    }
});
