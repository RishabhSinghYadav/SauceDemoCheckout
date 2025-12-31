const { test, expect, request } = require('@playwright/test');
const LoginAPI = require('../pages/api/loginAPI');
const testData = require('../data/testData.json');

test.describe('API Testing Suite for 405', () => {
  let apiContext;
  let loginApi;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://www.saucedemo.com', 
    });
    loginApi = new LoginAPI(apiContext);
  });

  test('Login API should return 405', async () => { //we dont have access of sauce demo api or power shell block, so just checking for 405
    
    const response = await loginApi.login(testData.username, testData.password);
    expect(response.status()).toBe(405);

    // If API returns JSON, parse and verify the response body
    try {
      const body = await response.json();
      console.log('Login response:', body);
      // verify if API returns token
      // for respose expect(body).toHaveProperty('token');
    } catch (e) {
      console.log('Response is not in JSON, raw text:', await response.text());
    }
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
