import test from "@playwright/test";
import { OrderComputerFlow } from "../../test_flows/computer/OrderComputerFlow";
import { standardComputerData } from "../../test_data/computer/StandardComputerData";

test("Build Standard Computer Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-own-computer");
    const orderComputerFlow = new OrderComputerFlow(page, standardComputerData);
    await orderComputerFlow.buildComputerSpecAndAddToCard();
    await orderComputerFlow.verifyShoppingCart();
});

