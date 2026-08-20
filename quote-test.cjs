const { chromium } = require('C:/Users/aaron/.vscode/extensions/danielsanmedium.dscodegpt-3.24.47/standalone/node_modules/patchright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: 'C:/Users/aaron/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
  });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('https://la-grafica-delta.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to quote section
  await page.evaluate(() => {
    document.querySelector('#presupuesto').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const quoteSection = document.querySelector('.quote-section');
    const quoteLayout = document.querySelector('.quote-layout');
    const quoteCopy = document.querySelector('.quote-copy');
    const quoteFormCard = document.querySelector('.quote-form-card');
    const quoteWhatsapp = document.querySelector('.quote-whatsapp');
    const container = document.querySelector('.container');
    const formRows = document.querySelectorAll('.form-row');
    const formFields = document.querySelectorAll('.form-field');

    return {
      quoteSection: quoteSection ? {
        width: getComputedStyle(quoteSection).width,
        overflow: getComputedStyle(quoteSection).overflow,
        padding: getComputedStyle(quoteSection).padding
      } : 'NOT FOUND',
      quoteLayout: quoteLayout ? {
        width: getComputedStyle(quoteLayout).width,
        display: getComputedStyle(quoteLayout).display,
        gridCols: getComputedStyle(quoteLayout).gridTemplateColumns,
        gap: getComputedStyle(quoteLayout).gap,
        overflow: getComputedStyle(quoteLayout).overflow
      } : 'NOT FOUND',
      quoteCopy: quoteCopy ? {
        width: getComputedStyle(quoteCopy).width,
        overflow: getComputedStyle(quoteCopy).overflow
      } : 'NOT FOUND',
      quoteFormCard: quoteFormCard ? {
        width: getComputedStyle(quoteFormCard).width,
        padding: getComputedStyle(quoteFormCard).padding,
        overflow: getComputedStyle(quoteFormCard).overflow,
        maxWidth: getComputedStyle(quoteFormCard).maxWidth,
        boxSizing: getComputedStyle(quoteFormCard).boxSizing
      } : 'NOT FOUND',
      quoteWhatsapp: quoteWhatsapp ? {
        width: getComputedStyle(quoteWhatsapp).width,
        overflow: getComputedStyle(quoteWhatsapp).overflow
      } : 'NOT FOUND',
      container: container ? {
        width: getComputedStyle(container).width
      } : 'NOT FOUND',
      formRows: Array.from(formRows).map(r => ({
        display: getComputedStyle(r).display,
        gridCols: getComputedStyle(r).gridTemplateColumns,
        width: getComputedStyle(r).width
      })),
      bodyOverflow: getComputedStyle(document.body).overflowX
    };
  });

  await page.screenshot({ path: 'C:/Users/aaron/OneDrive/Desktop/LaGrafica/mobile-quote.png', fullPage: false });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
