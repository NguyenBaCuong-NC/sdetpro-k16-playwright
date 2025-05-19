import { test } from '@playwright/test';
import FooterTestFlow from '../../test_flows/global/FooterTestFlow';

const PAGES = [
    { namePage: "Home Page", slug: "https://demowebshop.tricentis.com/homepage" },
    { namePage: "Login Page", slug: "https://demowebshop.tricentis.com/login" },
    { namePage: "Register Page", slug: "https://demowebshop.tricentis.com/register" },
    { namePage: "Shopping Cart Page", slug: "https://demowebshop.tricentis.com/cart" },
    { namePage: "Wishlist Page", slug: "https://demowebshop.tricentis.com/wishlist" },
]

PAGES.forEach(page => {
    const { namePage, slug } = page;
    test(`Verify Footer Component on ${namePage}`, async ({ page }) => {
        await page.goto(slug)
        const footerTestFlow = new FooterTestFlow(page);
        await footerTestFlow.verifyFooterComp();
    });
})