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

  const result = await page.evaluate(() => {
    const heroArt = document.querySelector('.hero-art');
    const heroArtCards = document.querySelector('.hero-art__cards');
    const cards = Array.from(document.querySelectorAll('.hero-card'));
    const quoteLayout = document.querySelector('.quote-layout');
    const quoteFormCard = document.querySelector('.quote-form-card');
    const heroSectionInner = document.querySelector('.hero-section__inner');
    const heroSection = document.querySelector('.hero-section');

    return {
      heroArt: heroArt ? {
        height: getComputedStyle(heroArt).height,
        width: getComputedStyle(heroArt).width,
        display: getComputedStyle(heroArt).display
      } : 'NOT FOUND',
      heroArtCards: heroArtCards ? {
        height: getComputedStyle(heroArtCards).height,
        width: getComputedStyle(heroArtCards).width,
        display: getComputedStyle(heroArtCards).display,
        gridCols: getComputedStyle(heroArtCards).gridTemplateColumns,
        inlineTransform: heroArtCards.style.transform || 'none',
        computedTransform: getComputedStyle(heroArtCards).transform
      } : 'NOT FOUND',
      cards: cards.map(c => ({
        cls: c.className.split(' ').pop(),
        display: getComputedStyle(c).display,
        visibility: getComputedStyle(c).visibility,
        position: getComputedStyle(c).position,
        width: getComputedStyle(c).width,
        height: getComputedStyle(c).height,
        top: getComputedStyle(c).top,
        left: getComputedStyle(c).left,
        overflow: getComputedStyle(c).overflow,
        background: getComputedStyle(c).background.substring(0, 80)
      })),
      heroSectionInner: heroSectionInner ? {
        display: getComputedStyle(heroSectionInner).display,
        gridCols: getComputedStyle(heroSectionInner).gridTemplateColumns,
        width: getComputedStyle(heroSectionInner).width,
        flexDir: getComputedStyle(heroSectionInner).flexDirection
      } : 'NOT FOUND',
      heroSection: heroSection ? {
        height: getComputedStyle(heroSection).height,
        overflow: getComputedStyle(heroSection).overflow
      } : 'NOT FOUND',
      quoteLayout: quoteLayout ? {
        display: getComputedStyle(quoteLayout).display,
        gridCols: getComputedStyle(quoteLayout).gridTemplateColumns,
        width: getComputedStyle(quoteLayout).width
      } : 'NOT FOUND',
      quoteFormCard: quoteFormCard ? {
        width: getComputedStyle(quoteFormCard).width,
        padding: getComputedStyle(quoteFormCard).padding
      } : 'NOT FOUND',
      viewport: { w: window.innerWidth, h: window.innerHeight }
    };
  });

  await page.screenshot({ path: 'C:/Users/aaron/OneDrive/Desktop/LaGrafica/mobile-hero.png', fullPage: false });
  await page.screenshot({ path: 'C:/Users/aaron/OneDrive/Desktop/LaGrafica/mobile-full.png', fullPage: true });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
