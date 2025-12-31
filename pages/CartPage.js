const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator("//button[normalize-space()='Checkout']");
  }

  async verifyCartItems(items) {
    await expect(this.page.locator(".cart_item")).toContainText(items);
    const quantities = await this.page.locator(".cart_quantity").allTextContents();
    quantities.forEach(q => expect(q).toBe("1"));
  }

  async clickOnCheckout() {
    await this.checkoutButton.click();
  }

  async selectRandomItems(count) {
  const items = await this.page.locator('.inventory_item_name').allTextContents();
  return items.sort(() => 0.5 - Math.random()).slice(0, count);
}

}

module.exports = CartPage;
