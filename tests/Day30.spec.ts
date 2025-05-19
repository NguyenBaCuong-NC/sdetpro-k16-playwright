import test from "@playwright/test";
import LoginPageMethod01 from "../models/pages/traditional/LoginPageMethod01";
import LoginPageMethod02 from "../models/pages/traditional/LoginPageMethod02";
import HomePage from "../models/pages/HomePage"

const loginCreds = {
    username: "tomsmith",
    password: "SuperSecretPassword!",
};

test.describe("Page Object Model - Approad 01", () => {
    test("Login test", async ({ page }) => {
        const loginPage = new LoginPageMethod01(page);
        await page.goto("./login");
        await loginPage.fillLoginForm(loginCreds);
    });
});

test.describe("Page Object Model - Approad 02", () => {
    test("Login test", async ({ page }) => {
        const loginPage = new LoginPageMethod02(page);
        await page.goto("./login");
        await loginPage.username().fill(loginCreds.username);
        await loginPage.password().fill(loginCreds.password);
        await loginPage.loginButton().click();
    });
});

test.describe("Page Object Model - Approad 03", () => {
    test("HomePage test", async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/");
        const homePage = new HomePage(page);
        const footerComponent = homePage.footerComponent();
        const poweredByText = await footerComponent.powerByText();
        console.log(poweredByText);
    });
});