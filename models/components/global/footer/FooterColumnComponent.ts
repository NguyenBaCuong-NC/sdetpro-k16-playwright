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

    async getTexts(): Promise<string[]> {
        // const linkListText: string[] = [];
        const texts = await this.component.locator(this.linkSelector).all();
        // for (const link of linlList) {
        //     const linkText = await link.innerText();
        //     linkListText.push(linkText);
        // }
        // return linkListText;
        return Promise.all(texts.map(link => link.innerText()));
    }

    async getLinkList(): Promise<string[]> {
        const linkList = await this.component.locator(this.linkSelector).all();
        return Promise.all(linkList.map(async link => await link.getAttribute('href') || ""));
    }

}
