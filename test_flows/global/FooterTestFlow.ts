import { Page } from "@playwright/test";
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
        // await this.verifyMyAccountColumnComponent();
        // await this.verifyFollowUSColumnComponent();
    }

    async verifyInfomationColumnComponent(footerComponent: FooterComponent) {
        const informationColumnComponent = footerComponent.informationColumnComponent();
        const expectedTexts = ["", "", ""];
        const expectedHrefs = ["", "", ""];

        await this.verifyFooterColumnComponent(informationColumnComponent, expectedTexts, expectedHrefs)
    }

    async verifyCustomerServiceColumnComponent(footerComponent: FooterComponent) {
        const customerServiceColumnComponent = footerComponent.customerServiceColumnComponent();
        const expectedTexts = ["", "", ""];
        const expectedHrefs = ["", "", ""];

        await this.verifyFooterColumnComponent(customerServiceColumnComponent, expectedTexts, expectedHrefs)
    }

    private async verifyFooterColumnComponent(
        footerColumnComponent: FooterColumnComponent,
        expectedTexts: string[],
        expectedHrefs: string[]) {

    }

}