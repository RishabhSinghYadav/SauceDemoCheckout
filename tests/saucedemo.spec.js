const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../data/testData.json');

test('Saucedemo checkout flow with POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(testData.username, testData.password);

  await inventoryPage.addProduct(inventoryPage.backpackLink, testData.expectedPrices.backpack);
  await inventoryPage.addProduct(inventoryPage.bikeLightLink, testData.expectedPrices.bikeLight);
  await inventoryPage.addProduct(inventoryPage.tshirtLink, testData.expectedPrices.tshirt);

  await inventoryPage.goToCart();
  await cartPage.assertCartItems(testData.cartItems);
  await cartPage.checkout();

  await checkoutPage.fillDetails(testData.firstName, testData.lastName, testData.postalCode);
  await checkoutPage.assertSummary(testData.expectedSummary);
  await checkoutPage.finishCheckout(testData.confirmation);
});
