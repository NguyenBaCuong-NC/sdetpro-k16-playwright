import { Page } from "@playwright/test";

// Using binding to provide arg for the callback function
export async function getAdvertisingParams(page: Page, adSlotId: string): Promise<any> {
    return await page.evaluate(adSlotId => {
        const slot = googletag.pubads().getSlots().find(({ getSlotElementId }) => getSlotElementId() === adSlotId);
        return slot.getTargetingMap();
    }, adSlotId);
}
