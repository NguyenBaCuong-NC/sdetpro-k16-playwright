import test from "@playwright/test";
import HomePage from "../models/pages/HomePage";
import PageBodyComponent from "../models/components/PageBodyComponent";

test("POM - List of component", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const homePage = new HomePage(page);
    const pageBodyComponent = homePage.pageBodyComponent();
    const productItemComponentList = await pageBodyComponent.productItemComponentList();
    for (const productItemComponent of productItemComponentList) {
        const productTitle = await productItemComponent.getProductTitle();
        const productPrice = await productItemComponent.getProductPrice();
        console.log(`${productTitle}: ${productPrice}`);
    }
});

test("POM - Reusing Base Component", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const homePage = new HomePage(page);
    const footerComponent = homePage.footerComponent();
    const informationColumnComponent = footerComponent.informationColumnComponent();
    const customerServiceColumnComponent = footerComponent.customerServiceColumnComponent();

    const infomationColumnText = await informationColumnComponent.getTitleText();
    console.log(infomationColumnText);

    const customerServiceColumnText = await customerServiceColumnComponent.getTitleText();
    console.log(customerServiceColumnText);
});
