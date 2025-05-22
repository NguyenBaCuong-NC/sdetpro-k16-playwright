import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";
import { ComputerEssentialComponent } from "../components/computer/ComputerEssentialComponent";

// Tạo ra 1 Constructor để tạo 1 đối tượng từ cái khuôn
export type ComputerComponentConstructor<Teo extends ComputerEssentialComponent> = (new (componentClass: Locator) => Teo);

export class ComputerDetailsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    /*
     * Có nhiều loại Computer Components: Standard, Cheap and Expensive
     * Chúng ta yêu cầu đưa vào 1 cái "khuôn", khi nào khởi tạo là tuỳ chúng ta
     * 
     */

    computerComponent<Teo extends ComputerEssentialComponent>(computerComponentClass: ComputerComponentConstructor<Teo>): Teo {
        return new computerComponentClass(this.page.locator(computerComponentClass.selectorValue));
    }


}