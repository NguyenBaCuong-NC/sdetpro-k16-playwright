import { Locator, Page } from "@playwright/test";
import ProductEssentialComponent from "../ProductEssentialComponent";
import { selector } from "../../SelectorDecorator";

@selector(".product-essential")
export abstract class ComputerEssentialComponent extends ProductEssentialComponent {

    // public static readonly LOCATOR = ".product-essential";

    constructor(protected component: Locator) {
        super(component);
    }
    abstract selectProcessor(value: string): Promise<string>;
    abstract selectRAM(value: string): Promise<string>;

    public async selectHDD(value: string): Promise<string> {
        return await this.selectComputerOtion(value);
    }

    public async selectSoftware(value: string): Promise<string> {
        return await this.selectComputerOtion(value);
    }

    protected async selectComputerOtion(type: string): Promise<string> {
        //$x('//label[contains(text(),"320")]')
        const selectorValue = `//label[contains(text(),"${type}")]`;
        const optionLocator = this.component.locator(selectorValue).first();
        await optionLocator.click();
        return await optionLocator.innerText();
    }

}