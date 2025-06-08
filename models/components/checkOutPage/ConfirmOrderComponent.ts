import { Locator } from "@playwright/test";

export default class ConfirmOrderComponent {

    public static readonly LOCATOR = '#opc-confirm_order';
    private continueBthSel = '[onclick="ConfirmOrder.save()"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async clickContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBthSel).click();
    }

}