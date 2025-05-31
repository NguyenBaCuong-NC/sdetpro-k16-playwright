import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    private allOptionSel = ".option-list input";
    private quantitySel = "input[class*='qty-input']";
    private addToCartBtnSel = "input[id^='add-to-cart-button']";
    private basePriceSel = "span[class^='price-value']";


    protected constructor(protected component: Locator) {
        this.component = component;
    }

    public async unselectAllOptions() {
        const allOptionLoc: Locator[] = await this.component.locator(this.allOptionSel).all();
        for (const optionLoc of allOptionLoc) {
            const isOptionSelected = await optionLoc.getAttribute("checked");
            if (isOptionSelected) {
                await optionLoc.click();
            }
        }
    }

    public async inputQuantity(quantity: number): Promise<void> {
        await this.component.locator(this.quantitySel).fill(quantity.toString());
    }

    public async clickOnAddToCartBtn(): Promise<string> {
        await this.component.locator(this.addToCartBtnSel).click();
        return '**/addproducttocart/**';
    }

    public async getBasePrice(): Promise<number> {
        return Number(await this.component.locator(this.basePriceSel).innerText());
    }

}