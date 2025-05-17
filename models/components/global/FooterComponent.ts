import { Locator } from "@playwright/test";

export default class FooterComponent {

    public static readonly LOCATOR = ".footer";

    constructor(private component: Locator) {
        this.component = component;
    }

    public async powerByText(): Promise<string> {
        return await this.component.locator(".footer-poweredby").innerText();
    }

}