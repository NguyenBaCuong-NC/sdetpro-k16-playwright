import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";
import { selector } from "../../../SelectorDecorator";

// Annotation
@selector(".column.column.customer-service")
export default class CustomerServiceColumnComponent extends FooterColumnComponent {

    // public static readonly LOCATOR = ".column.column.customer-service";

    constructor(component: Locator) {
        super(component);
    }

}