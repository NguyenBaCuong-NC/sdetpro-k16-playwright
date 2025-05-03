import { test } from "@playwright/test";

test('Link test - XPATH', async ({ page }) => {
    await page.goto("./")

    const footerLoc = page.locator("//a[contains(text(),'Elemental')]");
    // const footerEle = await page.waitForSelector("//a[contains(text(),'Elemental Selenium')]", { timeout: 5 * 1000 });
    await footerLoc.click();

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

test('Link test - CSS', async ({ page }) => {
    await page.goto("./")

    // const footerLoc = page.locator("a:has-text('Elemental Selenium')");
    const footerEle = await page.waitForSelector("a:has-text('Elemental Selenium')", { timeout: 5 * 1000 });
    await footerEle.click();

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

test('Link test - Filtering', async ({ page }) => {
    await page.goto("./")

    const footerLoc = page.locator("a").filter({ hasText: 'Elemental Selenium' });
    await footerLoc.click();

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

test('Handle multiple matching', async ({ page }) => {
    await page.goto("./")

    const items = page.locator("a");
    const totalItems = await items.count();
    console.log('Total Items: ', totalItems);

    // Interact on specific index item
    await items.nth(2).click();

    //Interact on the first item
    const forkMeOnGithupLoc = page.locator("//a/img");
    await forkMeOnGithupLoc.first().click();

    //Interact on the last item
    await items.last().click();


    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

test('Fill form authen', async ({ page }) => {
    await page.goto("./")

    // 1. Navigate to Form Authentication page
    const formAuthLink = page.locator("a").filter({ hasText: 'Form Authentication' });
    await formAuthLink.click();

    // 2.Fill the form
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    // await page.locator("button:has-text('Login')").click();
    await page.locator("button[type='submit']").click();

    // 3. Get the deading test on dashboard page
    const dashBoardHeadingLoc = "h2";
    let textContent = await page.locator(dashBoardHeadingLoc).textContent();
    let handleTextContent = textContent?.trim();
    console.log(handleTextContent);

    let innerText = await page.locator(dashBoardHeadingLoc).innerText();
    console.log(innerText);

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})
