import { Locator } from "@playwright/test";

export default class FooterColumnComponent {

    protected component: Locator;
    private titleSelector = 'h3';
    private linkSelector = 'li a';

    constructor(component: Locator) {
        this.component = component;
    }

    async getTitleText(): Promise<string> {
        return await this.component.locator(this.titleSelector).innerText();
    }

    async getLinkList(): Promise<string[]> {
        // const linkListText: string[] = [];
        const linlList = await this.component.locator(this.linkSelector).all();
        // for (const link of linlList) {
        //     const linkText = await link.innerText();
        //     linkListText.push(linkText);
        // }
        // return linkListText;

        return Promise.all(linlList.map(link => link.innerText()));

    }

}