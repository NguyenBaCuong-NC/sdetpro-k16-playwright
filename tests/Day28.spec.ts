import { expect, test } from "@playwright/test";

const CUSTOM_TIMEOUT = { timeout: 5 * 1000 };

test('Handle Do', async ({ page }) => {
    await page.goto("./")

    const footerLoc = page.locator("//a[contains(text(),'Elemental')]");
    // const footerEle = await page.waitForSelector("//a[contains(text(),'Elemental Selenium')]", { timeout: 5 * 1000 });
    await footerLoc.click();

    //DEBUG PURPOSE ONLY
    await page.waitForTimeout(3 * 1000);
})

test('Checking element states and handle dynamic control', async ({ page }) => {
    await page.goto('/dynamic_controls');

    // Find all parent components
    const checkboxComponent = page.locator('#checkbox-example');
    const inputComponent = page.locator('#input-example');

    // Interact with checkbox component's elements
    const checkBoxLocator = checkboxComponent.locator('#checkbox input');
    let isCheckboxEnabled = await checkBoxLocator.isEnabled();
    let isCheckboxChecked = await checkBoxLocator.isChecked();
    if (!isCheckboxChecked) {
        await checkBoxLocator.click();
    }
    await page.waitForTimeout(1000);
    const removeButtonLocator = checkboxComponent.locator("button");
    await removeButtonLocator.click();
    await page.waitForSelector('#checkbox-example #checkbox input', { state: "hidden" });

    // Interact with input component's elements
    let inputLocator = inputComponent.locator("input");
    let isInputDisabled = await inputLocator.isDisabled();
    console.log("Input is disabled: ", isInputDisabled);
    const enableButtonLocator = inputComponent.locator("button");
    await enableButtonLocator.click();
    await expect(inputLocator).toBeEnabled({ timeout: 10 * 1000 });
    inputLocator = inputComponent.locator("input");
    let isInputEnabled = await inputLocator.isEnabled();
    console.log("Input is enabled: ", isInputEnabled);
})
