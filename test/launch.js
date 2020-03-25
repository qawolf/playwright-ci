const pw = require('playwright');

(async () => {
  let browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  console.log('launched chromium!');
  await browser.close();

  browser = await pw.firefox.launch();
  console.log('launched firefox!');
  await browser.close();

  browser = await pw.webkit.launch();
  console.log('launched webkit!');
  await browser.close();
})();
