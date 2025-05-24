import { expect, Page } from "@playwright/test";
import FooterColumnComponent from "../../models/components/global/footer/FooterColumnComponent";
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import HomePage from "../../models/pages/HomePage";

export default class FooterTestFlow {

    constructor(private page: Page) {
        this.page = page;
    }

    async verifyFooterComp() {
        const homePage = new HomePage(this.page);
        const footerComponent = homePage.footerComponent();
        await this.verifyInfomationColumnComponent(footerComponent);
        await this.verifyCustomerServiceColumnComponent(footerComponent);
        await this.verifyMyAccountColumnComponent(footerComponent);
        await this.verifyFollowUSColumnComponent(footerComponent);
        await this.verifyPowerByText(footerComponent);
        await this.verifyCopyrightText(footerComponent);
    }

    async verifyInfomationColumnComponent(footerComponent: FooterComponent) {
        const informationColumnComponent = footerComponent.informationColumnComponent();
        const expectTitleText = "INFORMATION";
        const expectedTexts = [
            "Sitemap",
            "Shipping & Returns",
            "Privacy Notice",
            "Conditions of Use",
            "About us",
            "Contact us",
        ];
        const expectedHrefs = [
            "/sitemap",
            "/shipping-returns",
            "/privacy-policy",
            "/conditions-of-use",
            "/about-us",
            "/contactus",
        ];

        await this.verifyFooterColumnComponent(informationColumnComponent, expectTitleText, expectedTexts, expectedHrefs)
    }

    async verifyCustomerServiceColumnComponent(footerComponent: FooterComponent) {
        const customerServiceColumnComponent = footerComponent.customerServiceColumnComponent();
        const expectTitleText = "CUSTOMER SERVICE";
        const expectedTexts = [
            "Search",
            "News",
            "Blog",
            "Recently viewed products",
            "Compare products list",
            "New products",
        ];
        const expectedHrefs = [
            "/search",
            "/news",
            "/blog",
            "/recentlyviewedproducts",
            "/compareproducts",
            "/newproducts",
        ];

        await this.verifyFooterColumnComponent(customerServiceColumnComponent, expectTitleText, expectedTexts, expectedHrefs)
    }

    async verifyMyAccountColumnComponent(footerComponent: FooterComponent) {
        const myAccountColumnComponent = footerComponent.myAccountColumnComponent();
        const expectTitleText = "MY ACCOUNT";
        const expectedTexts = [
            "My account",
            "Orders",
            "Addresses",
            "Shopping cart",
            "Wishlist",
        ];
        const expectedHrefs = [
            "/customer/info",
            "/customer/orders",
            "/customer/addresses",
            "/cart",
            "/wishlist",
        ];

        await this.verifyFooterColumnComponent(myAccountColumnComponent, expectTitleText, expectedTexts, expectedHrefs)
    }

    async verifyFollowUSColumnComponent(footerComponent: FooterComponent) {
        const followUSColumnComponent = footerComponent.followUSColumnComponent();
        const expectTitleText = "FOLLOW US";
        const expectedTexts = [
            "Facebook",
            "Twitter",
            "RSS",
            "YouTube",
            "Google+",
        ];
        const expectedHrefs = [
            "http://www.facebook.com/nopCommerce",
            "https://twitter.com/nopCommerce",
            "/news/rss/1",
            "http://www.youtube.com/user/nopCommerce",
            "https://plus.google.com/+nopcommerce",
        ];

        await this.verifyFooterColumnComponent(
            followUSColumnComponent, expectTitleText, expectedTexts, expectedHrefs
        )
    }


    async verifyPowerByText(footerComponent: FooterComponent) {
        const expectedPowerByText: string = "Powered by nopCommerce";
        const expectedHrefs: string = "http://www.nopcommerce.com/";
        const actualPowerByText = await footerComponent.powerByText();
        const actualHrefs = await footerComponent.powerByHrefs();

        expect(actualPowerByText).toBe(expectedPowerByText);
        expect(actualHrefs).toBe(expectedHrefs);
    }

    async verifyCopyrightText(footerComponent: FooterComponent) {
        const expectedCopyrightText: string =
            "Copyright © 2025 Tricentis Demo Web Shop. All rights reserved.";
        const actualCopyrightText = await footerComponent.copyrightText();

        expect(actualCopyrightText).toBe(expectedCopyrightText);
    }

    private async verifyFooterColumnComponent(
        footerColumnComponent: FooterColumnComponent,
        expectTitleText: string,
        expectedTexts: string[],
        expectedHrefs: string[]) {

        const actualTitleText = await footerColumnComponent.getTitleText();
        const actualTexts = await footerColumnComponent.getTexts();
        const actualHrefs = await footerColumnComponent.getLinkList();
        expect(actualTitleText).toBe(expectTitleText);
        expect(actualTexts).toStrictEqual(expectedTexts);
        expect(actualHrefs).toStrictEqual(expectedHrefs);
    }

}