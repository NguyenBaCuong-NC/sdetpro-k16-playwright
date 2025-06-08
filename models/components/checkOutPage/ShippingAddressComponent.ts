import { Locator } from "@playwright/test";

export default class ShippingAddressComponent {

    public static readonly LOCATOR = '#opc-shipping';
    private continueBtnSel = '[onclick="Shipping.save()"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async waitForComponentVisible() {
        await this.component.locator(this.continueBtnSel).waitFor({ state: "visible", timeout: 15 * 1000 });
    }
    
    public async clickContinueBtn(): Promise<void> {
        return this.component.locator(this.continueBtnSel).click();
    }

}