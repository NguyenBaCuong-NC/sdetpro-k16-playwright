import { Page } from "@playwright/test";
import FooterComponent from "../components/global/footer/FooterComponent";
import HeaderComponent from "../components/global/header/HeaderComponent";

export default class BasePage {

    protected page: Page
    private barNotificationSel = '#bar-notification';

    constructor(page: Page) {
        this.page = page;
    }

    public footerComponent(): FooterComponent {
        return new FooterComponent(this.page.locator(FooterComponent.LOCATOR));
    }

    public headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.LOCATOR));
    }

    public async getBarNotificationText() {
        return await this.page.locator(this.barNotificationSel).innerText();
    }

}