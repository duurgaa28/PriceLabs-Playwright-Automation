import { expect, Locator, Page } from '@playwright/test';

export class MultiCalendarPage {

    readonly page: Page;

    // Navigation
    readonly dynamicPricingMenu: Locator;
    readonly multiCalendarMenu: Locator;

    // Listing Menu
    readonly editCustomizationMenu: Locator;
    readonly editCustomizations: Locator;

    // Customization Screen
    readonly allCustomizations: Locator;
    readonly lastMinutePricesTab: Locator;
    readonly lastMinuteHeading: Locator;

    // Last Minute Prices Controls
    readonly enableToggle: Locator;
    readonly priceType: Locator;
    readonly fixedValue: Locator;
    readonly daysField: Locator;

    readonly saveChanges: Locator;

    constructor(page: Page) {

        this.page = page;

        // ==========================
        // Top Navigation
        // ==========================

        this.dynamicPricingMenu = page.getByRole('button', {
            name: 'Dynamic Pricing'
        });

        this.multiCalendarMenu = page.getByRole('menuitem', {
            name: 'Multi Calendar'
        });

        // ==========================
        // Listing Menu
        // ==========================

        this.editCustomizationMenu = page.locator(
            '[qa-id="listing-ellipses-494081"]'
        );

        this.editCustomizations = page.getByRole('menuitem', {
            name: 'Edit Customizations'
        });

        // ==========================
        // Customization Page
        // ==========================

        this.allCustomizations = page.getByRole('button', {
            name: 'All Customizations'
        });

        this.lastMinutePricesTab = page.locator(
            '[qa-id="last-minute-prices-tab"]'
        );

        this.lastMinuteHeading = page.locator(
            '[qa-id="last-minute-prices-heading"]'
        );

        // ==========================
        // Last Minute Prices Controls
        // ==========================

        // qa-id is on the LABEL
        this.enableToggle = page.locator(
            '[qa-id="last-minute-prices-toggle"]'
        );

        // Native select element
        this.priceType = page.locator(
            'select[qa-id="select-last-minute-discount-type"]'
        );

        this.fixedValue = page.locator(
            'input[qa-id="last-minute-discount-value"]'
        );

        this.daysField = page.locator(
            'input[qa-id="last-minute-discount-within-days-value"]'
        );

        this.saveChanges = page.getByRole('button', {
            name: 'Save Changes'
        });
    }

    async openMultiCalendar() {

        await this.dynamicPricingMenu.click();

        await this.multiCalendarMenu.click();

        await this.page.waitForURL('**/multicalendar');
    }

    async openLastMinutePricesCustomization() {

        await this.editCustomizationMenu.click();

        await this.editCustomizations.click();

        await expect(
            this.page.getByRole('dialog')
        ).toBeVisible();

        await this.allCustomizations.click();

        await expect(this.lastMinutePricesTab).toBeVisible();

        const selected = await this.lastMinutePricesTab.getAttribute(
            'aria-selected'
        );

        if (selected !== 'true') {
            await this.lastMinutePricesTab.click();
        }

        await expect(this.lastMinuteHeading).toBeVisible();
    }

    async configureLastMinutePrices() {

        const checked = await this.enableToggle.isChecked();

if (!checked) {
    await this.enableToggle.check();
}
        await this.priceType.selectOption('fixed');
        await expect(this.fixedValue).toBeVisible();
        await this.fixedValue.click();
        //await this.fixedValue.press('Control+A');
        await this.fixedValue.fill('400');
        await expect(this.daysField).toBeVisible();
        await this.daysField.click();
        //await this.daysField.press('Control+A');
        await this.daysField.fill('4');
        await expect(this.fixedValue).toHaveValue('400');
        await expect(this.daysField).toHaveValue('4');
    }

    async saveCustomization() {

        await this.saveChanges.click();
    }

}