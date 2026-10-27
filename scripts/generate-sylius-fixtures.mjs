// Generate Sylius fixtures YAML from scraped Gamma Piu Polska data
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('data/gammapiu-products.json', 'utf-8'));

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function generateYaml() {
  const lines = [];

  lines.push('# Sylius Fixtures Suite for Gamma Piu Polska Store');
  lines.push('# Generated from gammapiu-polska.pl product catalog');
  lines.push('sylius_fixtures:');
  lines.push('    suites:');
  lines.push('        gamma_piu_polska:');
  lines.push('            listeners:');
  lines.push('                logger: ~');
  lines.push('            fixtures:');

  // 1. Locales
  lines.push('                locale:');
  lines.push('                    options:');
  lines.push('                        locales:');
  lines.push('                            - pl_PL');
  lines.push('                            - en_US');

  // 2. Currencies
  lines.push('                currency:');
  lines.push('                    options:');
  lines.push('                        currencies:');
  lines.push('                            - PLN');
  lines.push('                            - EUR');

  // 3. Geographic
  lines.push('                geo:');
  lines.push('                    options:');
  lines.push('                        countries:');
  lines.push('                            - PL');
  lines.push('                            - DE');

  // 4. Zones
  lines.push('                zone:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            PL:');
  lines.push('                                name: "Polska"');
  lines.push('                                type: country');
  lines.push('                                members:');
  lines.push('                                    - PL');

  // 5. Channels
  lines.push('                channel:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            GAMMA_PIU_PL:');
  lines.push('                                code: "GAMMA_PIU_PL"');
  lines.push('                                name: "Gamma Piu Polska"');
  lines.push('                                hostname: "gammapiu.localhost"');
  lines.push('                                color: "#111111"');
  lines.push('                                default_locale: "pl_PL"');
  lines.push('                                locales:');
  lines.push('                                    - "pl_PL"');
  lines.push('                                    - "en_US"');
  lines.push('                                base_currency: "PLN"');
  lines.push('                                currencies:');
  lines.push('                                    - "PLN"');
  lines.push('                                    - "EUR"');
  lines.push('                                tax_calculation_strategy: "order_items_based"');

  // 6. Tax category & rates
  lines.push('                tax_category:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            standard:');
  lines.push('                                code: "TAX_23"');
  lines.push('                                name: "VAT 23%"');
  lines.push('                tax_rate:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            vat_pl_23:');
  lines.push('                                code: "VAT_PL_23"');
  lines.push('                                name: "VAT 23% (PL)"');
  lines.push('                                zone: "PL"');
  lines.push('                                category: "TAX_23"');
  lines.push('                                amount: 23%');
  lines.push('                                included_in_price: true');

  // 7. Shipping category & methods
  lines.push('                shipping_category:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            standard:');
  lines.push('                                code: "STANDARD_SHIPPING"');
  lines.push('                                name: "Standard"');
  lines.push('                shipping_method:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            inpost_paczkomat:');
  lines.push('                                code: "INPOST_PACZKOMAT"');
  lines.push('                                name: "Paczkomaty InPost 24/7"');
  lines.push('                                zone: "PL"');
  lines.push('                                category: "STANDARD_SHIPPING"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                configuration:');
  lines.push('                                    GAMMA_PIU_PL:');
  lines.push('                                        amount: 1499');
  lines.push('                            kurier_dpd:');
  lines.push('                                code: "KURIER_DPD"');
  lines.push('                                name: "Kurier DPD / InPost Kurier"');
  lines.push('                                zone: "PL"');
  lines.push('                                category: "STANDARD_SHIPPING"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                configuration:');
  lines.push('                                    GAMMA_PIU_PL:');
  lines.push('                                        amount: 1899');
  lines.push('                            odbior_osobisty:');
  lines.push('                                code: "ODBIOR_OSOBISTY"');
  lines.push('                                name: "Odbiór osobisty (Wejherowo)"');
  lines.push('                                zone: "PL"');
  lines.push('                                category: "STANDARD_SHIPPING"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                configuration:');
  lines.push('                                    GAMMA_PIU_PL:');
  lines.push('                                        amount: 0');

  // 8. Payment methods
  lines.push('                payment_method:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            przelewy24:');
  lines.push('                                code: "P24_BLIK"');
  lines.push('                                name: "Przelewy24 / BLIK / Szybki Przelew"');
  lines.push('                                gatewayFactory: "offline"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                enabled: true');
  lines.push('                            payu:');
  lines.push('                                code: "PAYU"');
  lines.push('                                name: "Płatność PayU / Karty płatnicze"');
  lines.push('                                gatewayFactory: "offline"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                enabled: true');
  lines.push('                            pobranie:');
  lines.push('                                code: "COD"');
  lines.push('                                name: "Płatność przy odbiorze (Pobranie)"');
  lines.push('                                gatewayFactory: "offline"');
  lines.push('                                channels: ["GAMMA_PIU_PL"]');
  lines.push('                                enabled: true');

  // 9. Taxons (Categories)
  lines.push('                taxon:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            category:');
  lines.push('                                code: "CATEGORY"');
  lines.push('                                name: "Kategorie"');
  lines.push('                                children:');

  const rootCats = data.categories.filter(c => !c.parent);
  for (const rc of rootCats) {
    lines.push(`                                    ${rc.id}:`);
    lines.push(`                                        code: "${rc.code}"`);
    lines.push(`                                        name: "${rc.name}"`);
    const children = data.categories.filter(c => c.parent === rc.id);
    if (children.length > 0) {
      lines.push('                                        children:');
      for (const ch of children) {
        lines.push(`                                            ${ch.id}:`);
        lines.push(`                                                code: "${ch.code}"`);
        lines.push(`                                                name: "${ch.name}"`);
      }
    }
  }

  // 10. Product attributes
  lines.push('                product_attribute:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            brand:');
  lines.push('                                code: "BRAND"');
  lines.push('                                name: "Marka"');
  lines.push('                                type: "text"');
  lines.push('                            motor:');
  lines.push('                                code: "MOTOR_TYPE"');
  lines.push('                                name: "Rodzaj silnika"');
  lines.push('                                type: "text"');
  lines.push('                            warranty:');
  lines.push('                                code: "WARRANTY"');
  lines.push('                                name: "Gwarancja"');
  lines.push('                                type: "text"');

  // 11. Products
  lines.push('                product:');
  lines.push('                    options:');
  lines.push('                        custom:');

  for (const prod of data.products) {
    const code = 'PROD_' + prod.slug.toUpperCase().replace(/[^A-Z0-9]/g, '_').slice(0, 30);
    const priceInGrosze = Math.round((prod.price || 99) * 100);

    // map category to taxon code
    let taxonCode = 'EQUIPMENT';
    const catLower = (prod.category || '').toLowerCase();
    if (catLower.includes('maszynk')) taxonCode = 'CLIPPERS';
    else if (catLower.includes('suszark')) taxonCode = 'DRYERS';
    else if (catLower.includes('trymer')) taxonCode = 'TRIMMERS';
    else if (catLower.includes('golar')) taxonCode = 'SHAVERS';
    else if (catLower.includes('prostownic')) taxonCode = 'STRAIGHTENERS';
    else if (catLower.includes('ostrz') || catLower.includes('częśc')) taxonCode = 'PARTS';
    else if (catLower.includes('zestaw')) taxonCode = 'SETS';
    else if (catLower.includes('akcesor') || catLower.includes('grzebie')) taxonCode = 'ACCESSORIES';

    lines.push(`                            ${code}:`);
    lines.push(`                                code: "${code}"`);
    lines.push(`                                name: "${prod.name.replace(/"/g, '\\"')}"`);
    lines.push(`                                slug: "${prod.slug}"`);
    lines.push(`                                tax_category: "TAX_23"`);
    lines.push(`                                main_taxon: "${taxonCode}"`);
    lines.push(`                                taxons: ["${taxonCode}"]`);
    lines.push(`                                channels: ["GAMMA_PIU_PL"]`);
    if (prod.shortDescription) {
      lines.push(`                                short_description: "${prod.shortDescription.replace(/"/g, '\\"')}"`);
    }
    if (prod.description) {
      const cleanDesc = prod.description.replace(/"/g, '\\"').slice(0, 300);
      lines.push(`                                description: "${cleanDesc}..."`);
    }
    lines.push('                                product_attributes:');
    lines.push(`                                    BRAND: "${prod.brand}"`);
    lines.push('                                    WARRANTY: "24 miesiące (konsument) / 12 miesięcy (firma)"');
    lines.push('                                channel_pricings:');
    lines.push('                                    GAMMA_PIU_PL:');
    lines.push(`                                        price: ${priceInGrosze}`);
    if (prod.images && prod.images.length > 0) {
      lines.push('                                images:');
      for (const img of prod.images.slice(0, 3)) {
        lines.push(`                                    - type: "main"`);
        lines.push(`                                      path: "${img}"`);
      }
    }
  }

  // 12. Admin & Customer Users
  lines.push('                admin_user:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            admin:');
  lines.push('                                email: "admin@gammapiu-polska.pl"');
  lines.push('                                password: "sylius123"');
  lines.push('                                first_name: "Admin"');
  lines.push('                                last_name: "GammaPiu"');
  lines.push('                                locale_code: "pl_PL"');
  lines.push('                                api: true');

  lines.push('                shop_user:');
  lines.push('                    options:');
  lines.push('                        custom:');
  lines.push('                            customer:');
  lines.push('                                email: "klient@gammapiu-polska.pl"');
  lines.push('                                password: "sylius123"');
  lines.push('                                first_name: "Jan"');
  lines.push('                                last_name: "Kowalski"');
  lines.push('                                customer_group: null');
  lines.push('                                channel: "GAMMA_PIU_PL"');

  return lines.join('\n');
}

const yamlContent = generateYaml();
fs.mkdirSync('sylius-gammapiu/config/packages', { recursive: true });
fs.writeFileSync('sylius-gammapiu/config/packages/sylius_fixtures.yaml', yamlContent, 'utf-8');
console.log('Generated sylius-gammapiu/config/packages/sylius_fixtures.yaml successfully!');
