import { Locator } from "@playwright/test";

export default class CartItermRowComponent {
    public static readonly LOCATOR = '.cart-item-row';
    private productUnitPriceSel = '.product-unit-price';
    private quantityInputPriceSel = 'input[class*="qty-input"]';
    private subTotalPriceSel = '.product-subtotal';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async unitPrice(): Promise<number> {
        return Number(await this.component.locator(this.productUnitPriceSel).innerText());
    }

    public async quantityPrice(): Promise<number> {
        return Number(await this.component.locator(this.quantityInputPriceSel).getAttribute('value'));
    }

    public async subTotalPrice(): Promise<number> {
        return Number(await this.component.locator(this.subTotalPriceSel).innerText());
    }

}