const { expect } = require('@playwright/test');


class InventoryPage {
  constructor(page) {
    this.page = page;
    this.backpackLink = page.getByText('Sauce Labs Backpack');
    this.bikeLightLink = page.getByText('Sauce Labs Bike Light');
    this.tshirtLink = page.locator("(//div[normalize-space()='Sauce Labs Bolt T-Shirt'])[1]");
    this.addToCartButton = page.locator("(//button[normalize-space()='Add to cart'])[1]");
    this.backButton = page.locator("//button[normalize-space()='Back to products']");
    this.cartLink = page.locator("//a[@class='shopping_cart_link']");
  }

  async addProduct(linkLocator, expectedPrice) {
    await linkLocator.click();
    await expect(this.page.locator("(//div[@class='inventory_details_price'])[1]")).toHaveText(expectedPrice);
    await this.addToCartButton.click();
    await this.backButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;
