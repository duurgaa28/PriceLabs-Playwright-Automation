import { expect, Locator, Page } from '@playwright/test';

export class BillingPage {

    readonly page: Page;

    readonly profileButton: Locator;
    readonly billingMenu: Locator;
    readonly billingDetailsTab: Locator;
    readonly billingDetailsHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.profileButton = page.locator('[qa-id="profile-button"]');

        this.billingMenu = page.getByRole('menuitem', {
            name: 'Billing'
        });

        this.billingDetailsTab = page.locator('[qa-id="billing-tab-refer"]');

        this.billingDetailsHeading = page.getByRole('heading', {
            name: 'Billing Details'
        });
    }

    async openBilling() {
        await this.profileButton.click();
        await this.billingMenu.click();

        await this.page.waitForLoadState('networkidle');
    }

    async openBillingDetails() {
        await this.billingDetailsTab.click();
    }

    async verifyBillingDetailsPage() {
        await expect(this.billingDetailsHeading).toBeVisible();
    }

    async takeScreenshot() {
        await this.page.screenshot({
            path: 'test-results/BillingDetailsPage.png',
            fullPage: true
        });
    }
}