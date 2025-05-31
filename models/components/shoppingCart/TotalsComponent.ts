import { Locator } from "@playwright/test";

export default class TotalsComponent {

    public static readonly LOCATOR = '.totals';

    constructor(private component: Locator) {
        this.component = component;
    }
}