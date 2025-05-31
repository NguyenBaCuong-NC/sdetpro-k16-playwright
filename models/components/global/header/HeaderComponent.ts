import { Locator } from "@playwright/test";

export default class HeaderComponent {

    public static readonly LOCATOR = '.header';

    private shoppingCartLinkSel = 'a[href="/cart"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async clickOnShoppingCartLink(): Promise<void> {
        const shoppingCartLoc = this.component.locator(this.shoppingCartLinkSel).first();
        await shoppingCartLoc.scrollIntoViewIfNeeded();
        await shoppingCartLoc.click();
    }

}