import { Locator } from "@playwright/test";

export default class ShippingMethodComponent {

    public static readonly LOCATOR = '#opc-shipping_method';
    private allShippingMethodsSel = '.method-list label';
    private continueBtnSel = '[onclick="ShippingMethod.save()"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async waitForComponentVisible() {
        await this.component.locator(this.allShippingMethodsSel).first().waitFor({ state: "visible" });
    }

    public async getAllShippingMethodsLoc(): Promise<Locator[]> {
        return this.component.locator(this.allShippingMethodsSel).all();
    }

    public async clickContinueBtn(): Promise<void> {
        return this.component.locator(this.continueBtnSel).click();
    }

}