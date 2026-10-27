// Scraper script to extract real product and category data from gammapiu-polska.pl
import fs from 'node:fs';

const TARGET_URLS = [
  'https://gammapiu-polska.pl/maszynka-style-craft-reign',
  'https://gammapiu-polska.pl/trymer-style-craft-reign',
  'https://gammapiu-polska.pl/maszynka-alpha-up',
  'https://gammapiu-polska.pl/golarka-boosted-one-foil',
  'https://gammapiu-polska.pl/gamma-x-cell-s',
  'https://gammapiu-polska.pl/gamma-x-cell-s-1',
  'https://gammapiu-polska.pl/gamma-barber-phon-1',
  'https://gammapiu-polska.pl/gamma-plasma-new',
  'https://gammapiu-polska.pl/gamma-aria-dual-ionic-2',
  'https://gammapiu-polska.pl/suszarka-x-ceed-czarny',
  'https://gammapiu-polska.pl/maszynka-xceed',
  'https://gammapiu-polska.pl/maszynka-stylecraft-saber-ii-czarny',
  'https://gammapiu-polska.pl/maszynka-stylecraft-saber-ii-zloty',
  'https://gammapiu-polska.pl/maszynka-stylecraft-saber-ii-bialy',
  'https://gammapiu-polska.pl/stylecraft-sc-maszynka-rebel',
  'https://gammapiu-polska.pl/stylecraft-sc-rebel-1',
  'https://gammapiu-polska.pl/trymer-hitter-up',
  'https://gammapiu-polska.pl/zestaw-xcell-s-curlswaves-czarny',
  'https://gammapiu-polska.pl/zestaw-xcell-s-curlswaves-rose-gold',
  'https://gammapiu-polska.pl/zestaw-absolute',
  'https://gammapiu-polska.pl/zestaw-instinct',
  'https://gammapiu-polska.pl/zestaw-neo-protege',
  'https://gammapiu-polska.pl/zestaw-cyborg',
  'https://gammapiu-polska.pl/zestaw-saber-czarny',
  'https://gammapiu-polska.pl/zestaw-saber-bialy',
  'https://gammapiu-polska.pl/zestaw-xhorizoncurlswaves',
  'https://gammapiu-polska.pl/prostownica-donna-keratin-xceed-cordless',
  'https://gammapiu-polska.pl/ostrze-stale-x-pro-pvd-niebieskie',
  'https://gammapiu-polska.pl/zestaw-ostrzy-style-craft-x-pro-dlc-wide-the-one',
  'https://gammapiu-polska.pl/zestaw-ostrzy-echo-mim',
  'https://gammapiu-polska.pl/nasadki-dystansowe-thight-guards-rozowe',
  'https://gammapiu-polska.pl/grzebien-flow-comb-niebieski',
  'https://gammapiu-polska.pl/zestaw-grzebieni-pomaranczowy',
  'https://gammapiu-polska.pl/zestaw-grzebieni-zielony',
  'https://gammapiu-polska.pl/gumowe-gripy-rozowy',
  'https://gammapiu-polska.pl/gumowe-gripy-zielony',
  'https://gammapiu-polska.pl/koncentrator-air-touch-do-blowvac'
];

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeProduct(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: ${res.status}`);
      return null;
    }
    const html = await res.text();

    // 1. Try gtag event view_item
    let name = '';
    let price = 0;
    let brand = 'Gamma Piu';
    let category = 'Urządzenia fryzjerskie';
    let id = '';

    const gtagMatch = html.match(/gtag\("event",\s*"view_item",\s*(\{.*?\})\);/s);
    if (gtagMatch) {
      try {
        const data = JSON.parse(gtagMatch[1]);
        if (data.items && data.items[0]) {
          const it = data.items[0];
          name = it.item_name || '';
          price = it.price || data.value || 0;
          brand = it.item_brand || 'Gamma Piu';
          category = it.item_category || 'Urządzenia fryzjerskie';
          id = String(it.item_id || '');
        }
      } catch (e) {
        // ignore parse error
      }
    }

    if (!name) {
      const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
      name = h1Match ? cleanHtml(h1Match[1]) : '';
    }

    if (!price) {
      const priceMatch = html.match(/class="[^"]*js-product-price-value[^"]*"[^>]*content="([0-9.]+)"/);
      if (priceMatch) {
        price = parseFloat(priceMatch[1]);
      }
    }

    // Short description
    const shortDescMatch = html.match(/class="m-product-data-1__short-text[^"]*"[^>]*>(.*?)<\/div>/s);
    const shortDescription = shortDescMatch ? cleanHtml(shortDescMatch[1]) : '';

    // Full description
    const descMatch = html.match(/itemprop="description"[^>]*>(.*?)<\/div>/s);
    const fullDescription = descMatch ? cleanHtml(descMatch[1]) : shortDescription;

    // Images
    const images = [];
    const imgMatches = html.matchAll(/https:\/\/gammapiu-polska\.pl\/public\/upload\/catalog\/product\/[0-9]+\/minigallery\/(original|thumb_xlarge|thumb)_[a-f0-9]+\.(jpg|png|webp|jpeg)/g);
    for (const m of imgMatches) {
      if (!images.includes(m[0])) {
        images.push(m[0]);
      }
    }

    const slug = url.replace('https://gammapiu-polska.pl/', '').split('?')[0];

    return {
      id: id || slug,
      slug,
      url,
      name: name || slug,
      brand,
      category,
      price,
      currency: 'PLN',
      shortDescription,
      description: fullDescription,
      images: images.slice(0, 5)
    };
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return null;
  }
}

async function run() {
  console.log(`Scraping ${TARGET_URLS.length} products from gammapiu-polska.pl...`);
  const products = [];
  for (const url of TARGET_URLS) {
    const prod = await scrapeProduct(url);
    if (prod && prod.name) {
      products.push(prod);
      console.log(`[OK] ${prod.name} (${prod.brand}) - ${prod.price} PLN [${prod.category}]`);
    }
  }

  const output = {
    store: {
      name: 'Gamma Piu Polska',
      tagline: 'Oficjalny dystrybutor profesjonalnych urządzeń fryzjerskich',
      domain: 'gammapiu-polska.pl',
      address: 'ul. Budowlanych 4, Hala C, 84-200 Wejherowo',
      phone: '533 819 893',
      email: 'biuro@gammapiu-polska.pl',
      currency: 'PLN',
      locale: 'pl_PL'
    },
    categories: [
      { id: 'urzadzenia-fryzjerskie', code: 'EQUIPMENT', name: 'Urządzenia fryzjerskie', parent: null },
      { id: 'maszynki', code: 'CLIPPERS', name: 'Maszynki do strzyżenia', parent: 'urzadzenia-fryzjerskie' },
      { id: 'suszarki', code: 'DRYERS', name: 'Suszarki do włosów', parent: 'urzadzenia-fryzjerskie' },
      { id: 'trymery', code: 'TRIMMERS', name: 'Trymery', parent: 'urzadzenia-fryzjerskie' },
      { id: 'golarki', code: 'SHAVERS', name: 'Golarki', parent: 'urzadzenia-fryzjerskie' },
      { id: 'prostownice', code: 'STRAIGHTENERS', name: 'Prostownice do włosów', parent: 'urzadzenia-fryzjerskie' },
      { id: 'lokowki', code: 'CURLERS', name: 'Lokówki i falownice', parent: 'urzadzenia-fryzjerskie' },
      { id: 'czesci-eksploatacyjne', code: 'PARTS', name: 'Ostrza i części zamienne', parent: null },
      { id: 'akcesoria', code: 'ACCESSORIES', name: 'Akcesoria fryzjerskie', parent: null },
      { id: 'zestawy-promocyjne', code: 'SETS', name: 'Zestawy promocyjne', parent: null },
      { id: 'outlet', code: 'OUTLET', name: 'Outlet', parent: null }
    ],
    products
  };

  fs.writeFileSync('data/gammapiu-products.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Successfully saved ${products.length} products to data/gammapiu-products.json`);
}

run();
