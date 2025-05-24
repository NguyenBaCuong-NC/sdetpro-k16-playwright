import { Locator, Page } from "@playwright/test";
import ProductEssentialComponent from "../ProductEssentialComponent";
import { selector } from "../../SelectorDecorator";

@selector(".product-essential")
export abstract class ComputerEssentialComponent extends ProductEssentialComponent {

    // public static readonly LOCATOR = ".product-essential";

    constructor(protected component: Locator) {
        super(component);
    }

    abstract selectRAM(value: string);

    protected async selectComputerOtion(type: string) {
        //$x('//label[contains(text(),"320")]')
        const selectorValue = `//label[contains(text(),"${type}")]`;
        await this.component.locator(selectorValue).first().click();
    }

}