import test from "@playwright/test";
import { OrderComputerFlow } from "../../test_flows/computer/OrderComputerFlow";
import { expensiveComputerData } from "../../test_data/computer/ExpensiveComputerData";

test("Expensive Computer Component Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-own-expensive-computer-2");
    const orderComputerFlow = new OrderComputerFlow(page, expensiveComputerData);
    await orderComputerFlow.buildComputerSpecAndAddToCard();
    await orderComputerFlow.verifyShoppingCart();
    await orderComputerFlow.agreeTosAndCheckOut();
    await orderComputerFlow.inputBillingAddress();
    await orderComputerFlow.inputShippingAddress();
    await orderComputerFlow.selectShippingMethod();
    await orderComputerFlow.selectPaymentMethod();
    await orderComputerFlow.inputPaymentInfomation();
    await orderComputerFlow.confirmOrder();
});

