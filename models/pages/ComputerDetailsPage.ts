import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";
import { ComputerEssentialComponent } from "../components/computer/ComputerEssentialComponent";
import { Selector } from "../SelectorDecorator";

// Tạo ra 1 Constructor để tạo 1 đối tượng từ cái khuôn
export type ComputerComponentConstructor<T extends ComputerEssentialComponent> =
    (new (componentClass: Locator) => T);

export class ComputerDetailsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    /* Có nhiều loại Computer Components: Standard, Cheap and Expensive
     * Chúng ta yêu cầu đưa vào 1 cái "khuôn", khi nào khởi tạo là tuỳ chúng ta 
     */
    computerComponent<T extends ComputerEssentialComponent>
        (computerComponentClass: ComputerComponentConstructor<T>): T {
        return new computerComponentClass(this.page.locator(
            (computerComponentClass as ComputerComponentConstructor<T> & Selector).selectorValue
        ));
    }

}