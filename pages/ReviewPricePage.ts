import { Page, Locator, expect } from '@playwright/test';

export class ReviewPricePage {

    readonly page: Page;
    readonly dynamicPricing: Locator;
    readonly pricingDashboard: Locator;
   readonly hostawayRow: Locator;

constructor(page: Page) {

    this.page = page;

    this.dynamicPricing =
        page.getByRole('button', { name: 'Dynamic Pricing' });

    this.pricingDashboard =
        page.getByRole('menuitem', {
            name: 'Pricing Dashboard View'
        });

    // First Hostaway listing
    this.hostawayRow =
        page.locator('tr')
            .filter({ hasText: 'Hostaway' })
            .first();

}

    async openPricingDashboard() {

        await this.dynamicPricing.click();

        await this.pricingDashboard.click();

    }

   async clickReviewPrices() {

    await expect(this.hostawayRow).toBeVisible();

    await this.hostawayRow
        .getByRole('button', { name: 'Review Prices' })
        .click();

}

    async verifyReviewPricesPageOpened() {

        await expect(this.page).toHaveURL(/pricing/i);

    }

}