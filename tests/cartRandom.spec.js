const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutCartPage = require('../pages/CheckoutCartPage');

const testData = require('../data/testData.json');

test('Select 3 random items from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutCartPage(page);
  // Login
  await loginPage.gotoURL();
  await loginPage.loginUser(testData.username, testData.password);

  // Select items
  await productsPage.selectProduct(productsPage.backpackLink, testData.expectedPrices.backpack);
  await productsPage.selectProduct(productsPage.bikeLightLink, testData.expectedPrices.bikeLight);
  await productsPage.selectProduct(productsPage.tshirtLink, testData.expectedPrices.tshirt);

  // click to cart
  await productsPage.clickToCart();

  // Get all cart items in inventory
  const cartItems = await page.locator('.inventory_item_name').allTextContents();
  console.log('All items in cart:', cartItems);

  // Select first 3 random items
  const randomItems = cartItems
    .sort(() => 0.5 - Math.random())   // shuffle items
    .slice(0, 3);                      // take first 3

  console.log('Randomly selected items for cart:', randomItems);

  //  assertion
  expect(randomItems.length).toBe(3);

  //  user click on those random items
for (let item of randomItems) {
  await page.locator(`.inventory_item_name:has-text("${item}")`).click();
  await page.goBack(); // return to cart after selection
  }

  // Proceed to checkout
   await cartPage.clickOnCheckout(); 
   // Fill all checkout details 
   await checkoutPage.fillAllDetails(testData.firstName, testData.lastName, testData.postalCode); 
   // Assert summary info
   await checkoutPage.verifySummary(testData.expectedSummaryData); 
   // Finished checkout process
   await checkoutPage.finishButtonClick(testData.confirmation);
});
