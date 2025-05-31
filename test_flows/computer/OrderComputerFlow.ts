import { Page } from "@playwright/test";
import { ComputerDataType } from "../../test_data/computer/ComputerDataType";
import { ComputerDetailsPage } from "../../models/pages/ComputerDetailsPage";

// export class OrderComputerFlow extends LoginFlow {}
export class OrderComputerFlow {

    private totalPrice: number = 0;

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
        const { processor, hdd, ram, os, software, quantity } = this.computerData;

        const processorAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectProcessor(processor));
        const ramAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectRAM(ram));
        const hddAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectHDD(hdd));
        const softwareAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectSoftware(software));
        let osAdditionalPrice = 0;
        if (os) {
            osAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectOs(os));
        }
        if (quantity) {
            await computerComponent.inputQuantity(quantity);
        }

        const basePrice = await computerComponent.getBasePrice();
        const additionalPrice = processorAdditionalPrice + ramAdditionalPrice + hddAdditionalPrice + softwareAdditionalPrice + osAdditionalPrice;
        this.totalPrice = (basePrice + additionalPrice) * (quantity ? quantity : 1);

        // Add to cart and wait for event
        const requestSlug = await computerComponent.clickOnAddToCartBtn();
        await this.page.waitForResponse(requestSlug);

        // Navigate to Shopping Cart Page
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();

    }

    public verifyShoppingCart() {

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