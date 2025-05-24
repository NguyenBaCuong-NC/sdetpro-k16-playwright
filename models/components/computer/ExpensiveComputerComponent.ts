import { Locator } from "@playwright/test";
import { ComputerEssentialComponent } from "./ComputerEssentialComponent";

export default class ExpensiveComputerComponent extends ComputerEssentialComponent {

    constructor(component: Locator) {
        super(component);
    }

    public async selectProcessor(value: string): Promise<string> {
        return await this.selectComputerOtion(value);
    }

    public async selectRAM(value: string): Promise<string> {
        return await this.selectComputerOtion(value);
    }

}