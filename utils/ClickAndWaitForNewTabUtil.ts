import { Page, Locator } from "@playwright/test";

// export async function clickAndWaitForNewTab(page: Page, externalLinks: Locator, externalLinkCount: number): Promise<Page[]> {
//     const newTabs: Page[] = [];
//     for (let index = 0; index < externalLinkCount; index++) {
//         const [newTab] = await Promise.all([
//             page.context().waitForEvent('page'),
//             externalLinks.nth(index).click()
//         ]);
//         await newTab.waitForLoadState();
//         newTabs.push(newTab);
//     }
//     return newTabs;
// }

export async function clickAndWaitForNewTab(page: Page, locator: Locator, index: number): Promise<Page> {
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        locator.nth(index).click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
}



