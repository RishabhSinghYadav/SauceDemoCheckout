const { expect } = require('@playwright/test');


class ProductsPage {
  constructor(page) {
    this.page = page;
    this.backpackLink = page.getByText('Sauce Labs Backpack');
    this.bikeLightLink = page.getByText('Sauce Labs Bike Light');
    this.tshirtLink = page.locator("(//div[normalize-space()='Sauce Labs Bolt T-Shirt'])[1]");
    this.addToCartButton = page.locator("(//button[normalize-space()='Add to cart'])[1]");
    this.backButton = page.locator("//button[normalize-space()='Back to products']");
    this.cartLink = page.locator("//a[@class='shopping_cart_link']");
  }

  async selectProduct(linkLocator, expectedPrice) {
    await linkLocator.click();
    await expect(this.page.locator("(//div[@class='inventory_details_price'])[1]")).toHaveText(expectedPrice);
    await this.addToCartButton.click();
    await this.backButton.click();
  }

  async clickToCart() {
    await this.cartLink.click();
  }
}

module.exports = ProductsPage;
