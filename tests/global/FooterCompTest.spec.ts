import { test } from '@playwright/test';
import FooterTestFlow from '../../test_flows/global/FooterTestFlow';
import { PagesData } from '../../test_data/PagesData';

PagesData.forEach(page => {
    const { namePage, slug } = page;
    test(`Verify Footer Component on ${namePage}`, async ({ page }) => {
        await page.goto(slug)
        const footerTestFlow = new FooterTestFlow(page);
        await footerTestFlow.verifyFooterComp();
    });
})