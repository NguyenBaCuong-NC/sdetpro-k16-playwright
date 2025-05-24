import { Locator } from "@playwright/test";
import InformationColumnComponent from "./InformationColumnComponent";
import CustomerServiceColumnComponent from "./CustomerServiceColumnComponent";
import MyAccountColumnComponent from "./MyAccountColumnComponent";
import FollowUSColumnComponent from "./FollowUSColumnComponent";

// @selector(".footer")
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

    public myAccountColumnComponent(): MyAccountColumnComponent {
        return new MyAccountColumnComponent(this.component.locator(MyAccountColumnComponent.LOCATOR));
    }

    public followUSColumnComponent(): FollowUSColumnComponent {
        return new FollowUSColumnComponent(this.component.locator(FollowUSColumnComponent.LOCATOR));
    }

    public async powerByText(): Promise<string> {
        return await this.component.locator(".footer-poweredby").innerText();
    }

}