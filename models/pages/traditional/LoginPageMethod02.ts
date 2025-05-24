import { Locator, Page } from "@playwright/test";
import { LoginCreds } from "../../../test_data/DataType";

export default class LoginPageMethod02 {

    // Scope to declare selectors
    private usernameSelector: string = "#username";
    private passwordSelector: string = "#password";
    private loginButtonSelector: string = "button[type='submit']";

    // Constructor
    constructor(private page: Page) {
        this.page = page
    }

    public username(): Locator {
        return this.page.locator(this.usernameSelector);
    }

    public password(): Locator {
        return this.page.locator(this.passwordSelector);
    }

    public loginButton(): Locator {
        return this.page.locator(this.loginButtonSelector);
    }

}