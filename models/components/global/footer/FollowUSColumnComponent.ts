import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";
import { selector } from "../../../SelectorDecorator";

// @selector(".column.follow-us")
export default class FollowUSColumnComponent extends FooterColumnComponent {

    public static readonly LOCATOR = ".column.follow-us";

    constructor(component: Locator) {
        super(component);
    }

}