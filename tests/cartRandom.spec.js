const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

const testData = require('../data/testData.json');

test('Select 3 random items from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  // Login
  await loginPage.goto();
  await loginPage.login(testData.username, testData.password);

  // Add items (for demo, add all three defined in JSON)
  await inventoryPage.addProduct(inventoryPage.backpackLink, testData.expectedPrices.backpack);
  await inventoryPage.addProduct(inventoryPage.bikeLightLink, testData.expectedPrices.bikeLight);
  await inventoryPage.addProduct(inventoryPage.tshirtLink, testData.expectedPrices.tshirt);

  // Go to cart
  await inventoryPage.goToCart();

  // Get all cart items
  const cartItems = await page.locator('.inventory_item_name').allTextContents();
  console.log('All items in cart:', cartItems);

  // Select 3 random items
  const randomItems = cartItems
    .sort(() => 0.5 - Math.random())   // shuffle
    .slice(0, 3);                      // take first 3

  console.log('Randomly selected items:', randomItems);

  //  assertion
  expect(randomItems.length).toBe(3);

  //  action: click those random items
for (let item of randomItems) {
  await page.locator(`.inventory_item_name:has-text("${item}")`).click();
  await page.goBack(); // return to cart after viewing
  }

  // Proceed to checkout
   await cartPage.checkout(); 
   // Fill checkout details 
   await checkoutPage.fillDetails(testData.firstName, testData.lastName, testData.postalCode); 
   // Assert summary info 
   await checkoutPage.assertSummary(testData.expectedSummary); 
   // Finish checkout 
   await checkoutPage.finishCheckout(testData.confirmation);
});
