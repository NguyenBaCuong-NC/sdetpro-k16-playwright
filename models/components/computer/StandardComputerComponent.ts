import { errors, Locator } from "@playwright/test";
import { ComputerEssentialComponent } from "./ComputerEssentialComponent";

export default class StandardComputerComponent extends ComputerEssentialComponent {

    private allDropdownSelector: string = "select[id^='product_attribute']"

    constructor(component: Locator) {
        super(component);
    }

    public async selectProcessor(value: string): Promise<string> {
        const PROCESSOR_DROP_DOWN_INDEX: number = 0;
        const allDropdowns: Locator[] = await this.component.locator(this.allDropdownSelector).all();
        const processorDropdown: Locator = allDropdowns[PROCESSOR_DROP_DOWN_INDEX];
        return this.selectOption(processorDropdown, value);
    }

    public async selectRAM(value: string): Promise<string> {
        const RAM_DROP_DOWN_INDEX: number = 1;
        const allDropdowns: Locator[] = await this.component.locator(this.allDropdownSelector).all();
        const ramDropdown: Locator = allDropdowns[RAM_DROP_DOWN_INDEX];
        return this.selectOption(ramDropdown, value);
    }

    private async selectOption(dropdown: Locator, value: string): Promise<string> {
        const allOptionLocators: Locator[] = await dropdown.locator('option').all();
        let optionIndex = -1;
        let optionFullText: string | null = "";

        for (const optionLocator of allOptionLocators) {
            optionFullText = await optionLocator.innerText();
            if (optionFullText?.startsWith(value)) {
                optionIndex = allOptionLocators.indexOf(optionLocator);
                break;
            }
        }

        if (optionIndex === -1) {
            throw new Error(`There is no matching option for ${value}`);
        }

        await dropdown.selectOption({ index: optionIndex });
        return (optionFullText);
    }

}
