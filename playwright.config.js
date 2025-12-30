// playwright.config.js
module.exports = {
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,
  },
};
