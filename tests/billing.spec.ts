import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { BillingPage } from '../pages/BillingPage';

test.describe('Billing', () => {

    test('Verify user can open Billing Details tab', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const billingPage = new BillingPage(page);

        // Login
        await loginPage.navigate();
        await loginPage.login();

        // Close announcement popup if present
        await page.getByRole('button', { name: 'close' }).click({
            timeout: 5000
        }).catch(() => {});

        // Open Billing page
        await billingPage.openBilling();

        // Open Billing Details tab
        await billingPage.openBillingDetails();

        // Verify page
        await billingPage.verifyBillingDetailsPage();

        // Screenshot
        await billingPage.takeScreenshot();
    });

});