const { expect } = require('@playwright/test');

class CheckoutCartPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("//input[@id='first-name']");
    this.lastNameInput = page.locator("//input[@id='last-name']");
    this.postalCodeInput = page.locator("//input[@id='postal-code']");
    this.continueButton = page.locator("//input[@id='continue']");
    this.finishButton = page.locator("//button[normalize-space()='Finish']");
  }

  async fillAllDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifySummary(expectedSummary) {
    await expect(this.page.locator("(//div[normalize-space()='Payment Information:'])[1]")).toHaveText(expectedSummary.paymentInfo);
    await expect(this.page.locator("(//div[normalize-space()='SauceCard #31337'])[1]")).toHaveText(expectedSummary.paymentValue);
    await expect(this.page.locator("(//div[normalize-space()='Shipping Information:'])[1]")).toHaveText(expectedSummary.shippingInfo);
    await expect(this.page.locator("(//div[normalize-space()='Free Pony Express Delivery!'])[1]")).toHaveText(expectedSummary.shippingValue);
    await expect(this.page.locator("(//div[@class='summary_subtotal_label'])[1]")).toHaveText(expectedSummary.itemTotal);
    await expect(this.page.locator("(//div[@class='summary_tax_label'])[1]")).toHaveText(expectedSummary.tax);
    await expect(this.page.locator("(//div[@class='summary_total_label'])[1]")).toHaveText(expectedSummary.total);
  }

  async finishButtonClick(expectedConfirmation) {
    await this.finishButton.click();
    await expect(this.page.locator("(//span[@class='title'])[1]")).toHaveText(expectedConfirmation.title);
    await expect(this.page.getByRole('heading', { name: expectedConfirmation.thankYou })).toContainText([expectedConfirmation.thankYou]);
    await expect(this.page.locator("(//div[@class='complete-text'])[1]")).toContainText([expectedConfirmation.dispatch]);
  }
}

module.exports = CheckoutCartPage;
