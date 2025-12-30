const { test, expect, request } = require('@playwright/test');
const LoginAPI = require('../pages/api/loginAPI');
const testData = require('../data/testData.json');

test.describe('API Testing Suite', () => {
  let apiContext;
  let loginApi;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://www.saucedemo.com',   // replace with real API base URL
    });
    loginApi = new LoginAPI(apiContext);
  });

  test('Login API should return 405', async () => { //we dont have access of sauce demo api, so just checking for 405
    
    const response = await loginApi.login(testData.username, testData.password);
    expect(response.status()).toBe(405);

    // If API returns JSON, parse and assert
    try {
      const body = await response.json();
      console.log('Login response:', body);
      // assertion if API returns token
      // expect(body).toHaveProperty('token');
    } catch (e) {
      console.log('Response is not JSON, raw text:', await response.text());
    }
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
