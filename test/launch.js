const pw = require('playwright');

(async () => {
  try {
    let browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
    console.log('launched chromium!');
    await browser.close();

    browser = await pw.firefox.launch();
    console.log('launched firefox!');
    await browser.close();

    browser = await pw.webkit.launch();
    console.log('launched webkit!');
    await browser.close();
  } catch (error) {
    console.log('error launching browsers', error);
    process.exit(1);
  }
})();
