import { Locator, Page } from "@playwright/test";
import ProductEssentialComponent from "../ProductEssentialComponent";

export abstract class ComputerEssentialComponent extends ProductEssentialComponent {
    constructor(protected component: Locator) {
        super(component);
    }

    abstract selectRAM(value: string);

    protected async selectComputerOtion(type: string) {
        //$x('//label[contains(text(),"320")]')
        const selectorValue = `$x('//label[contains(text(),"${type}")]')`;
        await this.component.locator(selectorValue).first().click();
    }

}