import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";
import { selector } from "../../../SelectorDecorator";

@selector(".column.my-account")
export default class MyAccountColumnComponent extends FooterColumnComponent {

    // public static readonly LOCATOR = ".column.my-account";

    constructor(component: Locator) {
        super(component);
    }

}