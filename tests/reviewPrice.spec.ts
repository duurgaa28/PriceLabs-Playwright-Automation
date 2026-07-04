import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ManageListingsPage } from '../pages/ManageListingsPage';
import { ReviewPricePage } from '../pages/ReviewPricePage';

test.describe('Review Prices', () => {

    test('Verify user can open Review Prices for a Hostaway listing', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const manageListingsPage = new ManageListingsPage(page);

        const reviewPricePage = new ReviewPricePage(page);

        // Login

        await loginPage.navigate();

        await loginPage.login();

        // Close recommendation popup

        await manageListingsPage.closePopup();

        // Navigate to Pricing Dashboard

        await reviewPricePage.openPricingDashboard();

        // Open Review Prices

        await reviewPricePage.clickReviewPrices();

        // Verify Review Prices page opens

        await reviewPricePage.verifyReviewPricesPageOpened();

        // Attach screenshot

        await test.info().attach('Review Prices Page', {

            body: await page.screenshot({

                fullPage: true

            }),

            contentType: 'image/png'

        });

    });

});