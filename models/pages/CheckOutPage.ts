import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import BillingAddressComponent from "../components/checkOutPage/BillingAddressComponent";
import ShippingAddressComponent from "../components/checkOutPage/ShippingAddressComponent";
import ShippingMethodComponent from "../components/checkOutPage/ShippingMethodComponent";
import PaymentMethodComponent from "../components/checkOutPage/PaymentMethodComponent";
import PaymentInformationComponent from "../components/checkOutPage/PaymentInformationComponent";
import ConfirmOrderComponent from "../components/checkOutPage/ConfirmOrderComponent";

export default class CheckOutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public billingAddressComponent(): BillingAddressComponent {
        return new BillingAddressComponent(this.page.locator(BillingAddressComponent.LOCATOR));
    }

    public shippingAddressComponent(): ShippingAddressComponent {
        return new ShippingAddressComponent(this.page.locator(ShippingAddressComponent.LOCATOR));
    }

    public shippingMethodComponent(): ShippingMethodComponent {
        return new ShippingMethodComponent(this.page.locator(ShippingMethodComponent.LOCATOR));
    }

    public paymentMethodComponent(): PaymentMethodComponent {
        return new PaymentMethodComponent(this.page.locator(PaymentMethodComponent.LOCATOR));
    }

    public paymentInformationComponent(): PaymentInformationComponent {
        return new PaymentInformationComponent(this.page.locator(PaymentInformationComponent.LOCATOR));
    }

    public confirmOrderComponent(): ConfirmOrderComponent {
        return new ConfirmOrderComponent(this.page.locator(ConfirmOrderComponent.LOCATOR));
    }

}