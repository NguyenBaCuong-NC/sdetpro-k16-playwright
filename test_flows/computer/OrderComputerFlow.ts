import { Page } from "@playwright/test";
import { ComputerDataType } from "../../test_data/computer/ComputerDataType";
import { ComputerDetailsPage } from "../../models/pages/ComputerDetailsPage";

// export class OrderComputerFlow extends LoginFlow {}
export class OrderComputerFlow {
    constructor(private page: Page, private computerData: ComputerDataType) {
        this.page = page;
        this.computerData = computerData;
    }

    async buildComputerSpecAndAddToCard() {
        const computerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComponent = computerDetailsPage.computerComponent(this.computerData.computerCompClass);
        // Unselect all default options
        await computerComponent.unselectAllOptions();

        // Build computer spec base on test data
        const { processor, hdd, ram, os, software } = this.computerData;

        const processorAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectProcessor(processor));
        const ramAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectRAM(ram));
        const hddAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectHDD(hdd));
        const softwareAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectSoftware(software));

        console.log(processorAdditionalPrice, ramAdditionalPrice, hddAdditionalPrice, softwareAdditionalPrice);

        // await computerComponent.selectOS(os);
        // await computerComponent.selectSoftware(software);
        // 8 GB [+60.00]

        // DEBUG PURPOSE ONLY
        await this.page.waitForTimeout(3 * 1000);
    }


    private getAddtionalPrice(optionFullText: string): number {
        const regex = /\+\d+\.\d+/g;
        const matches = optionFullText.match(regex);
        if (matches) {
            return Number(matches[0].replace("+", "").trim());
        }
        return 0;
    }
}