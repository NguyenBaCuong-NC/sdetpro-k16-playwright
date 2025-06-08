import { expect, Page } from "@playwright/test";
import { ComputerDataType } from "../../test_data/computer/ComputerDataType";
import { ComputerDetailsPage } from "../../models/pages/ComputerDetailsPage";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckOutOptionPage from "../../models/pages/CheckOutOptionPage";
import defaultCheckOutUser from "../../test_data/DefaultCheckOutUser.json";
import defaultCheckoutCard from "../../test_data/DefaultCheckoutCard.json";
import CheckOutPage from "../../models/pages/CheckOutPage";

// export class OrderComputerFlow extends LoginFlow {}
export class OrderComputerFlow {

    private totalPriceList: number[] = [];
    private shippingFee: number = 0;

    constructor(private page: Page, private computerDataList: ComputerDataType[]) {
        this.page = page;
        this.computerDataList = computerDataList;
    }

    async buildComputerSpecAndAddToCard() {
        const computerDetailsPage = new ComputerDetailsPage(this.page);
        for (const computerData of this.computerDataList) {
            const computerComponent = computerDetailsPage.computerComponent(computerData.computerCompClass);
            // Unselect all default options
            await computerComponent.unselectAllOptions();

            // Build computer spec base on test data
            const { processor, hdd, ram, os, software, quantity } = computerData;
            const processorAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectProcessor(processor));

            const ramAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectRAM(ram));
            const hddAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectHDD(hdd));
            const softwareAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectSoftware(software));
            let osAdditionalPrice = 0;
            if (os) {
                osAdditionalPrice = this.getAddtionalPrice(await computerComponent.selectOs(os));
            }
            if (quantity) {
                await computerComponent.inputQuantity(quantity);
            }

            const basePrice = await computerComponent.getBasePrice();
            const additionalPrice = processorAdditionalPrice + ramAdditionalPrice + hddAdditionalPrice + softwareAdditionalPrice + osAdditionalPrice;
            let totalPrice = (basePrice + additionalPrice) * (quantity ? quantity : 1);
            this.totalPriceList.push(totalPrice);
            // Add to cart and wait for event
            const requestSlug = await computerComponent.clickOnAddToCartBtn();
            await this.page.waitForResponse(requestSlug);
        }

        // Navigate to Shopping Cart Page
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();
    }

    public async verifyShoppingCart() {
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const totalsComponent = shoppingCartPage.totalsComponent();
        const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();

        // Verify all shopping item rows
        expect(cartItemRowComponentList.length).toBeGreaterThan(0);
        let cartItemRowsSubtotal = 0;
        cartItemRowComponentList.forEach(async (cartItemRowComponent, index) => {
            const unitPrice = await cartItemRowComponent.unitPrice();
            const quantity = await cartItemRowComponent.quantityPrice();
            const subTotal = await cartItemRowComponent.subTotalPrice();
            cartItemRowsSubtotal += subTotal;
            expect(unitPrice * quantity).toBe(subTotal);
            expect(subTotal).toBe(this.totalPriceList[index]);
        })


        //Verifying totals component
        const priceCategories = await totalsComponent.priceCategories();
        const subTotal = priceCategories["Sub-Total:"];
        const shipping = priceCategories['Shipping:'];
        const tax = priceCategories['Tax:'];
        const total = priceCategories['Total:'];
        expect(subTotal).toBe(cartItemRowsSubtotal);
        expect(total).toBe(subTotal + shipping + tax);
    }

    public async agreeTosAndCheckOut() {
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const totalsComponent = shoppingCartPage.totalsComponent();
        await totalsComponent.acceptTos();
        await totalsComponent.clickCheckOutBtn();
        await new CheckOutOptionPage(this.page).clickCheckOutAsGuest();
    }

    public async inputBillingAddress() {
        const { firstName, lastName, email, country, state, city, add1, zipCode, phoneNum } = defaultCheckOutUser;
        const checkOutPage = new CheckOutPage(this.page);
        const billingAddressComponent = checkOutPage.billingAddressComponent();
        await billingAddressComponent.inputFirstName(firstName);
        await billingAddressComponent.inputLastName(lastName);
        await billingAddressComponent.inputEmail(email);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectState(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputAdd1(add1);
        await billingAddressComponent.inputZipCode(zipCode);
        await billingAddressComponent.inputPhoneNum(phoneNum);
        await billingAddressComponent.clickContinueBtn();
    }

    public async inputShippingAddress() {
        const checkOutPage = new CheckOutPage(this.page);
        const shippingAddressComponent = checkOutPage.shippingAddressComponent();
        await shippingAddressComponent.waitForComponentVisible();
        await shippingAddressComponent.clickContinueBtn();
    }

    public async selectShippingMethod() {
        const checkOutPage = new CheckOutPage(this.page);
        const shippingMethodComponent = checkOutPage.shippingMethodComponent();
        await shippingMethodComponent.waitForComponentVisible();
        const allShippingMethods = await shippingMethodComponent.getAllShippingMethodsLoc();
        const randomIndex = Math.floor(Math.random() * allShippingMethods.length);
        const randomShippingMethodLoc = allShippingMethods[randomIndex];
        await randomShippingMethodLoc.click();
        const shippingMethodFullText = await randomShippingMethodLoc.innerText();
        this.shippingFee = this.getAddtionalPrice(shippingMethodFullText);
        console.log(shippingMethodFullText);
        console.log(this.shippingFee);
        await shippingMethodComponent.clickContinueBtn();
    }

    public async selectPaymentMethod() {
        const checkOutPage = new CheckOutPage(this.page);
        const paymentMethodComponent = checkOutPage.paymentMethodComponent();
        await paymentMethodComponent.selectPaymentMethod("Credit");
        await paymentMethodComponent.clickContinueBtn();
    }

    public async inputPaymentInfomation() {
        const checkOutPage = new CheckOutPage(this.page);
        const paymentInformationComponent = checkOutPage.paymentInformationComponent();
        const { firstName, lastName } = defaultCheckOutUser;
        const { cardNumber, expirationMonth, expirationYear, cardCode } = defaultCheckoutCard.discover;
        await paymentInformationComponent.selectCreditCard('Discover');
        await paymentInformationComponent.inputCardHolderName(`${firstName},${lastName}`);
        await paymentInformationComponent.inputCardNumber(cardNumber);
        await paymentInformationComponent.selectExpirationMonth(expirationMonth);
        await paymentInformationComponent.selectExpirationYear(expirationYear);
        await paymentInformationComponent.inputCardCode(cardCode);
        await paymentInformationComponent.clickContinueBtn();
    }

    public async confirmOrder() {
        const checkOutPage = new CheckOutPage(this.page);
        const confirmOrderComponent = checkOutPage.confirmOrderComponent();
        await confirmOrderComponent.clickContinueBtn();
    }

    private getAddtionalPrice(optionFullText: string): number {
        const regex = /\[\+?\d+\.\d+\]/g;
        const matches = optionFullText.match(regex);
        if (matches) {
            return Number(matches[0].replace("[", '').replace("]", '').trim());
        }
        return 0;
    }

}