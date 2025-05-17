import { Page } from "@playwright/test";
import { LoginCreds } from "../../../types/DataType";

export default class LoginPageMethod01 {

    // Scope to declare selectors
    private usernameSelector: string = "#username";
    private passwordSelector: string = "#password";
    private loginButtonSelector: string = "button[type='submit']";

    // Constructor
    constructor(private page: Page) {
        this.page = page
    }

    // Main interaction methods
    // public async fillLoginForm(username: string, password: string): Promise<void> {
    //     this.inputUsername(username);
    //     this.inputPassword(password);
    //     this.clickLoginButton();
    // }

    public async fillLoginForm({ username, password }: LoginCreds): Promise<void> {
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.clickLoginButton();
    }

    public async inputUsername(username: string): Promise<void> {
        await this.page.locator(this.usernameSelector).fill(username);
    }

    public async inputPassword(password: string): Promise<void> {
        await this.page.locator(this.passwordSelector).fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.page.locator(this.loginButtonSelector).click();
    }

}