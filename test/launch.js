const pw = require('playwright');

(async () => {
  try {
    let browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
    let page = await browser.newPage();
    console.log('launched chromium');
    await page.goto('http://example.org');
    await page.click('a');
    await browser.close();
    console.log('closed chromium');

    browser = await pw.firefox.launch();
    page = await browser.newPage();
    console.log('launched firefox');
    await page.goto('http://example.org');
    await page.click('a');
    await browser.close();
    console.log('closed firefox');

    browser = await pw.webkit.launch();
    page = await browser.newPage();
    console.log('launched webkit');
    await page.goto('http://example.org');
    await page.click('a');
    await browser.close();
    console.log('closed webkit');
  } catch (error) {
    console.log('error launching browsers', error);
    process.exit(1);
  }
})();
