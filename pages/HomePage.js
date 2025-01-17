const { expect } = require('@playwright/test');
const locators = require('../utils/locators');

class HomePage {
  constructor(page) {
    this.page = page;
    this.navbar = page.locator(locators.navbar);
    this.appDownloadButton = page.locator(locators.appDownloadButton);
    this.helpSupportButton = page.locator(locators.helpSupportButton);
    this.loginLink = page.locator(locators.loginLink);
    this.signupLink = page.locator(locators.signupLink);
  }

  async navigateToDaraz() {
    await this.page.goto('https://www.daraz.pk/');
  }
}

module.exports = HomePage;
