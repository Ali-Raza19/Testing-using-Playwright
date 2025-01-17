const locators = require('../utils/locators');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(locators.searchInput);
    this.heading = page.locator(locators.heading);
    this.brandCheckbox = page.locator(locators.brandCheckbox);
    this.minPriceInput = page.locator('input.q9tZB[placeholder="Min"]');
    this.maxPriceInput = page.locator('input.q9tZB[placeholder="Max"]');
    this.applyPriceButton = page.locator('button.ant-btn-primary');
  }

  async searchForItem(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async getSearchResultText() {
    return this.heading.textContent();
  }

  async selectBrandAndVerifyUrl(brandName) {
    await this.page.waitForSelector(`label:has-text("${brandName}") input[type="checkbox"]`, { timeout: 30000 });
    await this.page.locator(`label:has-text("${brandName}") input[type="checkbox"]`).click();
    await this.page.waitForURL(`*${brandName.toLowerCase().replace(/\s+/g, '-')}`, { timeout: 30000 });
    const currentUrl = this.page.url();
    return currentUrl;
  }

  async applyPriceFilter(minPrice, maxPrice) {
    await this.page.fill(locators.minPriceInput, minPrice.toString());
    await this.page.fill(locators.maxPriceInput, maxPrice.toString());
    await this.page.click(locators.applyFilterButton);
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
  }

  async getProductCount() {
    return await this.page.$$eval(locators.productItems, (items) => items.length);
  }

  async clickOnFirstProductAndVerifyUrl() {
    const productSelector = 'a[data-qa-locator="product-item"]';
    await this.page.waitForSelector(productSelector, { timeout: 30000 });
    const firstProduct = await this.page.$(productSelector);
    if (!firstProduct) throw new Error('No product found to click.');

    const productUrl = await firstProduct.getAttribute('href');
    await firstProduct.click();
    await this.page.waitForLoadState('domcontentloaded');
    
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(productUrl);
  }

  async verifyFreeShipping() {
    try {
      await this.page.waitForSelector('.delivery-option-item__shipping-fee', { timeout: 30000 });
      const shippingFee = await this.page.textContent('.delivery-option-item__shipping-fee');
      expect(shippingFee.trim()).toBe('FREE');
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Free shipping is not available or the element is missing.');
    }
  }
}

module.exports = SearchPage;
