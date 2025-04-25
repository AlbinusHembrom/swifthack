const puppeteer = require('puppeteer');

(async () => {
  const place = 'Starbucks Times Square';
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(place)}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(searchUrl, { waitUntil: 'networkidle2' });

  // Wait for the search results to load
  await page.waitForTimeout(4000);

  // Click on the first result
  const placeLink = await page.$('a[href*="/place/"]');
  if (placeLink) {
    await placeLink.click();
    await page.waitForTimeout(5000); // Wait for place page to load
  } else {
    console.log('Place not found.');
    await browser.close();
    return;
  }

  // Try to extract live busyness info
  try {
    const liveStatus = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('div'))
        .find(div => div.textContent && div.textContent.includes('Live'));
      return el ? el.textContent.trim() : 'No live data found';
    });

    console.log('Live busyness info:', liveStatus);
  } catch (err) {
    console.error('Error getting live data:', err);
  }

  await browser.close();
})();
