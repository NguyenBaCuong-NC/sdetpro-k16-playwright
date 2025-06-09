import test, { expect } from "@playwright/test";
import { OrderComputerFlow } from "../../test_flows/computer/OrderComputerFlow";
import { standardComputerData } from "../../test_data/computer/StandardComputerData";
import { ComputerDataType } from "../../test_data/computer/ComputerDataType";
import BasePage from "../../models/pages/BasePage";

test("Build Standard Computer Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-own-computer");
    const missingHddField: ComputerDataType[] = [{ ...standardComputerData[0], hdd: '' }];
    const orderComputerFlow = new OrderComputerFlow(page, missingHddField);
    await orderComputerFlow.buildComputerSpecSelectively();
    const basePage = new BasePage(page);
    const barNotiText = await basePage.getBarNotificationText();
    expect(barNotiText).toContain('Please select HDD');
});

