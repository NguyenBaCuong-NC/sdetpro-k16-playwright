import { Page, test } from '@playwright/test';

test.describe('Handle Alerts', () => {

    test('Handle JS Alert', async ({ page }) => {
        await page.goto('/javascript_alerts');
        const jsAlertLoc = page.locator("button[onclick='jsAlert()']");

        //Must define event dandler
        page.on('dialog', async dialog => {
            await dialog.accept();
        })

        //Trigger the JS alert
        await jsAlertLoc.click();
    })

    test('Handle JS Confirm', async ({ page }) => {
        await page.goto('/javascript_alerts');
        const jsConfirmLoc = page.locator("button[onclick='jsConfirm()']");

        //Must define event dandler
        page.on('dialog', async dialog => {
            await dialog.dismiss();
        })

        //Trigger the JS alert
        await jsConfirmLoc.click();
    })

    test('Handle JS Prompt', async ({ page }) => {
        await page.goto('/javascript_alerts');
        const jsPromptLoc = page.locator("button[onclick='jsPrompt()']");
        const resultLoc = page.locator('#result')

        //Must define event dandler
        page.on('dialog', async dialog => {
            await dialog.accept('Alo 123');
        })

        //Trigger the JS alert
        await jsPromptLoc.click();
        const resultText = await resultLoc.innerText();
        console.log(resultText);
    })

})

test.describe('Execute JS snipet', () => {
    // Execute without params
    test("Execute without params", async ({ page }) => {
        await page.goto("./floating_menu");
        await scrollToBottom(page);

        await page.evaluate(() => {
            const elementsToRemove = document.querySelectorAll("h3");
            elementsToRemove.forEach(element => element.remove());
        });
    })

    //Execute with params and get return values
    test("Execute with params and get return values", async ({ page }) => {
        await page.goto("https://www.foodandwine.com/");
        const adId = "leaderboard-flex-1"
        const leaderBoardFlexLoc = `#${adId}`;
        await page.waitForSelector(leaderBoardFlexLoc, { timeout: 10 * 1000 });

        const adParams = await getAdvertisingParams(page, adId);
        console.log(JSON.stringify(adParams));
    })

})

async function scrollToBottom(page: Page): Promise<void> {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
}

async function getAdvertisingParams(page: Page, adSlotId: string): Promise<any> {
    return await page.evaluate(adSlotId => {
        const slot = googletag.pubads().getSlots().find(({ getSlotElementId }) => getSlotElementId() === adSlotId);
        return slot.getTargetingMap();
    }, adSlotId);
}




