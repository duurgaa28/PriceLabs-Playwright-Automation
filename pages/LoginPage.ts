import { Page } from '@playwright/test';
import { testData } from '../utils/testData';

export class LoginPage {

    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto(
            'https://pricelabs.co/signin?redirectTo=https%3A%2F%2Fapp.pricelabs.co%2Fpricing'
        );
    }

    async login() {

        await this.page.getByRole('textbox', {
            name: 'Email Address'
        }).fill(testData.email);

        await this.page.getByRole('textbox', {
            name: 'Password'
        }).fill(testData.password);

        await this.page.getByRole('button', {
            name: 'Sign in'
        }).click();

        await this.page.waitForLoadState('networkidle');
    }

}