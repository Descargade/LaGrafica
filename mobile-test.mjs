export default async function run(page, ui) {
  await page.setViewportSize({width: 375, height: 812});
  await page.goto('https://la-grafica-delta.vercel.app');
  await page.waitForTimeout(2000);

  const result = await page.evaluate(() => {
    const heroArt = document.querySelector('.hero-art');
    const heroArtCards = document.querySelector('.hero-art__cards');
    const cards = Array.from(document.querySelectorAll('.hero-card'));
    const quoteLayout = document.querySelector('.quote-layout');
    const quoteFormCard = document.querySelector('.quote-form-card');
    const heroSectionInner = document.querySelector('.hero-section__inner');
    const container = document.querySelector('.container');

    return {
      heroArt: heroArt ? {
        height: getComputedStyle(heroArt).height,
        width: getComputedStyle(heroArt).width,
        display: getComputedStyle(heroArt).display,
        overflow: getComputedStyle(heroArt).overflow,
        marginTop: getComputedStyle(heroArt).marginTop
      } : null,
      heroArtCards: heroArtCards ? {
        height: getComputedStyle(heroArtCards).height,
        width: getComputedStyle(heroArtCards).width,
        display: getComputedStyle(heroArtCards).display,
        gridCols: getComputedStyle(heroArtCards).gridTemplateColumns,
        transform: heroArtCards.style.transform || 'none',
        computedTransform: getComputedStyle(heroArtCards).transform,
        position: getComputedStyle(heroArtCards).position
      } : null,
      cards: cards.map(c => ({
        cls: c.className,
        display: getComputedStyle(c).display,
        visibility: getComputedStyle(c).visibility,
        opacity: getComputedStyle(c).opacity,
        position: getComputedStyle(c).position,
        width: getComputedStyle(c).width,
        height: getComputedStyle(c).height,
        top: getComputedStyle(c).top,
        left: getComputedStyle(c).left,
        transform: getComputedStyle(c).transform,
        overflow: getComputedStyle(c).overflow,
        color: getComputedStyle(c).color,
        background: getComputedStyle(c).background
      })),
      quoteLayout: quoteLayout ? {
        display: getComputedStyle(quoteLayout).display,
        gridCols: getComputedStyle(quoteLayout).gridTemplateColumns,
        width: getComputedStyle(quoteLayout).width,
        gap: getComputedStyle(quoteLayout).gap,
        padding: getComputedStyle(quoteLayout).padding
      } : null,
      quoteFormCard: quoteFormCard ? {
        width: getComputedStyle(quoteFormCard).width,
        padding: getComputedStyle(quoteFormCard).padding,
        overflow: getComputedStyle(quoteFormCard).overflow
      } : null,
      heroSectionInner: heroSectionInner ? {
        display: getComputedStyle(heroSectionInner).display,
        gridCols: getComputedStyle(heroSectionInner).gridTemplateColumns,
        width: getComputedStyle(heroSectionInner).width,
        paddingBottom: getComputedStyle(heroSectionInner).paddingBottom
      } : null,
      container: container ? {
        width: getComputedStyle(container).width,
        padding: getComputedStyle(container).padding
      } : null
    };
  });

  await page.screenshot({path: 'C:\Users\aaron\OneDrive\Desktop\LaGrafica\mobile-hero.png', fullPage: false});
  await page.screenshot({path: 'C:\Users\aaron\OneDrive\Desktop\LaGrafica\mobile-full.png', fullPage: true});
  return result;
}
