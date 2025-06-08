import { Locator } from "@playwright/test";

export default class PaymentInformationComponent {

    public static readonly LOCATOR = '#opc-payment_info';
    private selectCardTypeDropDownSel = "#CreditCardType";
    private cardHolderNameSel = '#CardholderName';
    private cardNumberSel = '#CardNumber';
    private selectExpMonthDropdownSel = '#ExpireMonth';
    private selectExpYearDropdownSel = '#ExpireYear';
    private cardCodeSel = '#CardCode';
    private continueBtnSel = '[onclick="PaymentInfo.save()"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async selectCreditCard(cardType: string): Promise<void> {
        await this.component.locator(this.selectCardTypeDropDownSel).selectOption({ label: cardType });
    }

    public async inputCardHolderName(name: string): Promise<void> {
        await this.component.locator(this.cardHolderNameSel).fill(name);
    }

    public async inputCardNumber(value: string): Promise<void> {
        await this.component.locator(this.cardNumberSel).fill(value);
    }

    public async selectExpirationMonth(month: string): Promise<void> {
        await this.component.locator(this.selectExpMonthDropdownSel).selectOption({ label: month });
    }

    public async selectExpirationYear(year: string): Promise<void> {
        await this.component.locator(this.selectExpYearDropdownSel).selectOption({ label: year });
    }

    public async inputCardCode(value: string): Promise<void> {
        await this.component.locator(this.cardCodeSel).fill(value);
    }

    public async clickContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
    }

}