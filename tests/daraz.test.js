const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');

test.describe('Daraz Homepage Tests', () => {
  
  let homePage;
  let searchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigateToDaraz();
  });

  test('Validate whether homepage renders', async () => {
    await expect(homePage.navbar).toBeVisible();
    await expect(homePage.appDownloadButton).toBeVisible();
    await expect(homePage.helpSupportButton).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.signupLink).toBeVisible();
  });

  test('Validate whether search functionality correctly works', async () => {
    await searchPage.searchForItem("electronics");
    await expect(searchPage.heading).toHaveText('electronics');
    await expect(searchPage.heading).toBeVisible();
  });

  test('Validate URL changes when selecting a brand', async () => {
    const brand = "DENOVO MART"; 
    await searchPage.searchForItem("electronics");
  
    const newUrl = await searchPage.selectBrandAndVerifyUrl(brand);
  
    expect(newUrl).toContain(brand.toLowerCase().replace(/\s+/g, '-'));
  });

  test('Validate price filter functionality loads products with count > 0', async () => {
    // Step 1: Search for 'electronics'
    await searchPage.searchForItem('electronics');

    // Step 2: Apply price filters
    const minPrice = 500;
    const maxPrice = 5000;
    await searchPage.applyPriceFilter(minPrice, maxPrice);

    // Step 3: Get product count and assert
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    await searchPage.clickOnFirstProductAndVerifyUrl();
  });


  test('should verify free shipping availability for a product', async () => {
    await searchPage.searchForItem('electronics'); // Replace with relevant search if needed
    await searchPage.clickOnFirstProductAndVerifyUrl(); // Ensure a product page is opened

    // Verify free shipping availability
    await searchPage.verifyFreeShipping();
});


 
});
