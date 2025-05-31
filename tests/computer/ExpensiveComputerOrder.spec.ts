import test from "@playwright/test";
import { OrderComputerFlow } from "../../test_flows/computer/OrderComputerFlow";
import { expensiveComputerData } from "../../test_data/computer/ExpensiveComputerData";

test("Expensive Computer Component Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-own-expensive-computer-2");
    const orderComputerFlow = new OrderComputerFlow(page, expensiveComputerData);
    await orderComputerFlow.buildComputerSpecAndAddToCard();
    await orderComputerFlow.verifyShoppingCart();
});

