import { Locator } from "@playwright/test";

export default class TotalsComponent {

    public static readonly LOCATOR = '.totals';
    private priceTableRowSel = '.cart-total tr';
    private priceTypeSel = '.cart-total-left';
    private priceValueSel = '.cart-total-right';
    private tosSel = '#termsofservice';
    private checkOutBtnSel = '#checkout';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async priceCategories(): Promise<any> {
        let priceCategories = {};
        const priceTableRowLocs = await this.component.locator(this.priceTableRowSel).all();
        for (const priceTableRow of priceTableRowLocs) {
            const priceTypeText = await priceTableRow.locator(this.priceTypeSel).innerText();
            const priceValueText = await priceTableRow.locator(this.priceValueSel).innerText();
            priceCategories[priceTypeText] = Number(priceValueText);
        }
        return priceCategories;
    }

    public async acceptTos(): Promise<void> {
        await this.component.locator(this.tosSel).click();
    }

    public async clickCheckOutBtn(): Promise<void> {
        await this.component.locator(this.checkOutBtnSel).click();
    }

}