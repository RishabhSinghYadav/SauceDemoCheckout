const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutCartPage = require('../pages/CheckoutCartPage');
const testData = require('../data/testData.json');

test('Saucedemo checkout flow with POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutCartPage(page);

  await loginPage.gotoURL();
  await loginPage.loginUser(testData.username, testData.password);

  await productsPage.selectProduct(productsPage.backpackLink, testData.expectedPrices.backpack);
  await productsPage.selectProduct(productsPage.bikeLightLink, testData.expectedPrices.bikeLight);
  await productsPage.selectProduct(productsPage.tshirtLink, testData.expectedPrices.tshirt);

  await productsPage.clickToCart();
  await cartPage.verifyCartItems(testData.cartItemsDetails);
  await cartPage.clickOnCheckout();

  await checkoutPage.fillAllDetails(testData.firstName, testData.lastName, testData.postalCode);
  await checkoutPage.verifySummary(testData.expectedSummaryData);
  await checkoutPage.finishButtonClick(testData.confirmation);
});
