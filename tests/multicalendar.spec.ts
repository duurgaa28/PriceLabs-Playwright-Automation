import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { MultiCalendarPage } from '../pages/MultiCalendarPage';

test.describe('Multi Calendar', () => {

    test('Verify user can configure Last Minute Prices customization', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const multiCalendarPage = new MultiCalendarPage(page);

        // Login
        await loginPage.navigate();
        await loginPage.login();

        // Close onboarding popup if displayed
        const closeButton = page.getByRole('button', { name: 'close' });

        if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
        }

        // Navigate to Multi Calendar
        await multiCalendarPage.openMultiCalendar();

        // Screenshot - Multi Calendar Page
        await page.screenshot({
            path: 'test-results/multicalendar-page.png',
            fullPage: true
        });

        // Open Last Minute Prices customization
        await multiCalendarPage.openLastMinutePricesCustomization();

        // Configure customization
        await multiCalendarPage.configureLastMinutePrices();

        // Screenshot - Values entered
        await page.screenshot({
            path: 'test-results/last-minute-prices-filled.png',
            fullPage: true
        });

        // Save changes
        await multiCalendarPage.saveCustomization();

        // Verify Save button disappears
        await expect(
            page.getByRole('button', { name: 'Save Changes' })
        ).toBeHidden();

        // Final Screenshot
        await page.screenshot({
            path: 'test-results/last-minute-prices-saved.png',
            fullPage: true
        });

    });

});