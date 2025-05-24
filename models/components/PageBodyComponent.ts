import { Locator } from "@playwright/test";
import ProductItemComponent from "./ProductItemComponent";
import { selector } from "../SelectorDecorator";

// @selector(".page-body")
export default class PageBodyComponent {
    public static readonly LOCATOR = ".page-body";

    constructor(private component: Locator) {
        this.component = component;
    }

    async productItemComponentList(): Promise<ProductItemComponent[]> {
        const productItemComponentList = await this.component.locator(ProductItemComponent.LOCATOR).all();
        return productItemComponentList.map(locator => new ProductItemComponent(locator));
    }
}