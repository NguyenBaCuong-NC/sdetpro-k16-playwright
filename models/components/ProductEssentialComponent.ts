import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    private allOptionSel = ".option-list input";
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

}