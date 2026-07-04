import { Page, expect } from '@playwright/test';

export class ManageListingsPage {

    constructor(private page: Page) {}

    async closePopup() {
        const closeBtn = this.page.getByRole('button', { name: 'close' });

        if (await closeBtn.isVisible().catch(() => false)) {
            await closeBtn.click();
        }
    }

    async openManageListings() {
        await this.page.getByRole('button', { name: 'Dynamic Pricing' }).click();

        await this.page.getByRole('menuitem', {
            name: /Manage Listings/
        }).click();
    }

    async enableEditMode() {
        await this.page
            .locator('.css-udow74 > .chakra-checkbox > .chakra-checkbox__control')
            .first()
            .click();
    }

    async updatePrices(min: string, base: string, max: string) {

        const firstRow = this.page.locator('tbody tr').first();

        const minPrice = firstRow.locator('input[id*="ml-min-price-input"]');
        const basePrice = firstRow.locator('input[id*="ml-base-price-input"]');
        const maxPrice = firstRow.locator('input[id*="ml-max-price-input"]');

        await expect(minPrice).toBeEnabled();

        await minPrice.fill(min);
        await minPrice.press('Enter');

        await basePrice.fill(base);
        await basePrice.press('Enter');

        await maxPrice.fill(max);
        await maxPrice.press('Enter');
    }

    async verifyPrices(min: string, base: string, max: string) {

        const firstRow = this.page.locator('tbody tr').first();

        await expect(
            firstRow.locator('input[id*="ml-min-price-input"]')
        ).toHaveValue(min);

        await expect(
            firstRow.locator('input[id*="ml-base-price-input"]')
        ).toHaveValue(base);

        await expect(
            firstRow.locator('input[id*="ml-max-price-input"]')
        ).toHaveValue(max);
    }

}