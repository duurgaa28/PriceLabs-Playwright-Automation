import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ManageListingsPage } from '../pages/ManageListingsPage';
import { testData } from '../utils/testData';

test.describe('Manage Listings', () => {

    test('Verify user can update minimum, base and maximum price for the first listing', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const manageListingsPage = new ManageListingsPage(page);

        // Login
        await loginPage.navigate();
        await loginPage.login();

        // Close dashboard popup if displayed
        await manageListingsPage.closePopup();

        // Navigate to Manage Listings
        await manageListingsPage.openManageListings();

        // Enable edit mode
        await manageListingsPage.enableEditMode();

        // Update prices for first listing
        await manageListingsPage.updatePrices(
            testData.minPrice,
            testData.basePrice,
            testData.maxPrice
        );

        // Verify updated values
        await manageListingsPage.verifyPrices(
            testData.minPrice,
            testData.basePrice,
            testData.maxPrice
        );
        //Verify by screenshot
        await test.info().attach('Manage Listings Updated', {
  body: await page.screenshot({ fullPage: true }),
  contentType: 'image/png',
});

    });

});