import { Locator } from "@playwright/test";
import InformationColumnComponent from "./InformationColumnComponent";
import CustomerServiceColumnComponent from "./CustomerServiceColumnComponent";
import MyAccountColumnComponent from "./MyAccountColumnComponent";
import FollowUSColumnComponent from "./FollowUSColumnComponent";
import { selector } from "../../../SelectorDecorator";

@selector(".footer")
export default class FooterComponent {

    // public static readonly LOCATOR = ".footer";

    constructor(private component: Locator) {
        this.component = component;
    }

    public informationColumnComponent(): InformationColumnComponent {
        return new InformationColumnComponent(this.component.locator(InformationColumnComponent.selectorValue));
    }

    public customerServiceColumnComponent(): CustomerServiceColumnComponent {
        return new InformationColumnComponent(this.component.locator(CustomerServiceColumnComponent.selectorValue));
    }

    public myAccountColumnComponent(): MyAccountColumnComponent {
        return new MyAccountColumnComponent(this.component.locator(MyAccountColumnComponent.selectorValue));
    }

    public followUSColumnComponent(): FollowUSColumnComponent {
        return new FollowUSColumnComponent(this.component.locator(FollowUSColumnComponent.selectorValue));
    }

    public async powerByText(): Promise<string> {
        return await this.component.locator(".footer-poweredby").innerText();
    }

}