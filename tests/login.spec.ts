import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

    test('Verify user can login successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        // Navigate to PriceLabs Login page
        await loginPage.navigate();

        // Login with valid credentials
        await loginPage.login();
        await page.pause();

        // Verify user is redirected to the Pricing Dashboard
        await expect(page).toHaveURL(/pricing/);

       
        // 📸 Attach screenshot to HTML report
        await test.info().attach('Login Successful', {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png',
        });

    });

});