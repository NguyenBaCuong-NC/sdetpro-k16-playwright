import { Locator } from "@playwright/test";
import InformationColumnComponent from "./InformationColumnComponent";
import CustomerServiceColumnComponent from "./CustomerServiceColumnComponent";

export default class FooterComponent {

    public static readonly LOCATOR = ".footer";

    constructor(private component: Locator) {
        this.component = component;
    }

    public informationColumnComponent(): InformationColumnComponent {
        return new InformationColumnComponent(this.component.locator(InformationColumnComponent.LOCATOR));
    }

    public customerServiceColumnComponent(): CustomerServiceColumnComponent {
        return new InformationColumnComponent(this.component.locator(CustomerServiceColumnComponent.LOCATOR));
    }

    public async powerByText(): Promise<string> {
        return await this.component.locator(".footer-poweredby").innerText();
    }

}