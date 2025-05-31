import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import CartItermRowComponent from "../components/shoppingCart/CartItemRowComponent";
import TotalsComponent from "../components/shoppingCart/TotalsComponent";

export default class ShoppingCartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async cartItemRowComponentList(): Promise<CartItermRowComponent[]> {
        const cartItemRowComponent = await this.page.locator(CartItermRowComponent.LOCATOR).all();
        return cartItemRowComponent.map(component => new CartItermRowComponent(component))
    }

    public totalsComponent(): TotalsComponent {
        return new TotalsComponent(this.page.locator(TotalsComponent.LOCATOR));
    }

}