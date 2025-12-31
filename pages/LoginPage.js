const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@id='user-name']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//input[@id='login-button']");
  }

  async gotoURL() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async loginUser(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
}

module.exports = LoginPage;
