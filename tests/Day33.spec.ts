import test from "@playwright/test";
import HomePage from "../models/pages/HomePage";
import PageBodyComponent from "../models/components/PageBodyComponent";
import CheapComputerComponent from "../models/components/computer/CheapComputerComponent";
import StandardComputerComponent from "../models/components/computer/StandardComputerComponent";
import { ComputerDetailsPage } from "../models/pages/ComputerDetailsPage";
import CustomerServiceColumnComponent from "../models/components/global/footer/CustomerServiceColumnComponent";

test("Cheap Computer Component Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-cheap-own-computer");
    // C1: const computerComponent = new CheapComputerComponent(page.locator(".product-essential"));
    // C2: Đưa các component vào 1 page
    const computerDetailsPage = new ComputerDetailsPage(page);
    const computerComponent = computerDetailsPage.computerComponent(CheapComputerComponent);
    await computerComponent.selectRAM("8 GB")
    await page.waitForTimeout(3 * 1000);
});

test("Standard Computer Component Test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/build-your-own-computer");
    // const computerComponent = new StandardComputerComponent(page.locator(".product-essential"));
    const computerDetailsPage = new ComputerDetailsPage(page);
    const computerComponent = computerDetailsPage.computerComponent(StandardComputerComponent);
    await computerComponent.selectRAM("8GB")
    await page.waitForTimeout(3 * 1000);
});

test("Test annotation - decorator approach", async ({ page }) => {
    getComponentSelector(CustomerServiceColumnComponent)
});

const getComponentSelector = (componentClass) => console.log(componentClass.selectorValue)