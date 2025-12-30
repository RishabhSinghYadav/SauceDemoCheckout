# SauceDemoCheckout
Setup Instructions
1.	Create repository in GitHub and clone it into VS Code.
o	Follow best practices: use POM, cover test scenarios, ensure correctness, avoid hardcoded values, and include API tests.
2.	Initialize Node.js project
npm init -y
o	This creates package.json in the project.
3.	Install Playwright
npm install @playwright/test
o	Installs Playwright, creates node_modules folder, and generates package-lock.json.
4.	Install Playwright test runner
npx playwright install
5.	Create tests folder
o	Inside it, add saucedemospec.js file for writing test cases.
6.	Run tests
npx playwright test
7.	Create Playwright configuration file
o	Add playwright.config.js to manage browser settings, retries, reports, and test directory paths.
8.	Generate HTML report:
npx playwright show-report


