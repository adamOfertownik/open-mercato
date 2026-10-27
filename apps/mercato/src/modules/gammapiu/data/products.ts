export interface GammaPiuProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  shortDescription: string;
  description: string;
  images: string[];
  badge?: string;
  specs?: Record<string, string>;
}

export interface GammaPiuCategory {
  id: string;
  code: string;
  name: string;
  parent: string | null;
}

export const STORE_INFO = {
  name: 'Gamma Piu Polska',
  tagline: 'Oficjalny dystrybutor profesjonalnych urządzeń fryzjerskich',
  domain: 'gammapiu-polska.pl',
  address: 'ul. Budowlanych 4, Hala C, 84-200 Wejherowo',
  phone: '533 819 893',
  servicePhone: '533 936 703',
  email: 'biuro@gammapiu-polska.pl',
  currency: 'PLN',
  freeShippingThreshold: 250,
};

export const CATEGORIES: GammaPiuCategory[] = [
  { id: 'wszystkie', code: 'ALL', name: 'Wszystkie produkty', parent: null },
  { id: 'maszynki', code: 'CLIPPERS', name: 'Maszynki do strzyżenia', parent: 'urzadzenia' },
  { id: 'suszarki', code: 'DRYERS', name: 'Suszarki do włosów', parent: 'urzadzenia' },
  { id: 'trymery', code: 'TRIMMERS', name: 'Trymery', parent: 'urzadzenia' },
  { id: 'golarki', code: 'SHAVERS', name: 'Golarki', parent: 'urzadzenia' },
  { id: 'prostownice', code: 'STRAIGHTENERS', name: 'Prostownice i lokówki', parent: 'urzadzenia' },
  { id: 'zestawy', code: 'SETS', name: 'Zestawy promocyjne', parent: null },
  { id: 'czesci', code: 'PARTS', name: 'Ostrza i części zamienne', parent: null },
  { id: 'akcesoria', code: 'ACCESSORIES', name: 'Akcesoria', parent: null },
];

export const PRODUCTS: GammaPiuProduct[] = [
  {
    id: '922',
    slug: 'maszynka-style-craft-reign',
    name: 'Maszynka StyleCraft REIGN',
    brand: 'StyleCraft',
    category: 'maszynki',
    price: 1199,
    currency: 'PLN',
    badge: 'Nowość',
    shortDescription: 'Profesjonalna maszynka do strzyżenia włosów Reign z bezszczotkowym silnikiem cyfrowym EON.',
    description: 'STYLECRAFT REIGN to profesjonalna maszynka do strzyżenia stworzona z myślą o maksymalnej wydajności, precyzji i komforcie pracy. Wyposażona w bezszczotkowy silnik cyfrowy EON, ostrze Premium Echo Taper DLC oraz wydajny akumulator litowo-jonowy, zapewnia płynne, ciche i niezwykle precyzyjne cięcie podczas każdej stylizacji.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_8b4176333a699d9e8509c5c99bbff2a0.jpg',
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_032b9812664a5a52fb022e5ce880c61b.jpg',
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_74ee3f0b6013acc56da3ab3fec232438.jpg'
    ],
    specs: {
      'Silnik': 'Bezszczotkowy silnik cyfrowy EON (7200 RPM)',
      'Ostrze': 'Black Diamond Carbon DLC Echo Taper',
      'Bateria': 'Li-Ion 120 minut ciągłej pracy',
      'Czas ładowania': '105 minut przez stację dokującą / USB-C',
      'Waga': '270 g',
      'Gwarancja': '24 miesiące B2C / 12 miesięcy B2B'
    }
  },
  {
    id: '921',
    slug: 'trymer-style-craft-reign',
    name: 'Trymer StyleCraft REIGN',
    brand: 'StyleCraft',
    category: 'trymery',
    price: 949,
    currency: 'PLN',
    badge: 'Bestseller',
    shortDescription: 'Profesjonalny trymer do konturowania Reign z bezszczotkowym silnikiem cyfrowym EON.',
    description: 'StyleCraft Reign Trimmer wyposażony jest w cyfrowy silnik EON oraz ostrze X-Pro DLC One. Niezwykła precyzja cięcia przy zerowej szczelinie (zero-gap). Idealny do najdokładniejszych linii i wykończeń fryzury.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/921/minigallery/thumb_large_56ae29ffe73e83a3d38557e4f9bb4b0b.jpg'
    ],
    specs: {
      'Silnik': 'Cyfrowy EON bezszczotkowy (7500 RPM)',
      'Ostrze': 'X-Pro DLC Wide Zero Gap',
      'Bateria': '180 minut pracy',
      'Waga': '180 g',
      'Gwarancja': '24 miesiące'
    }
  },
  {
    id: 'alpha-up',
    slug: 'maszynka-alpha-up',
    name: 'Maszynka Gamma Più Alpha Up',
    brand: 'Gamma Più',
    category: 'maszynki',
    price: 649,
    currency: 'PLN',
    badge: 'Polecane',
    shortDescription: 'Profesjonalna modułowa maszynka do strzyżenia z silnikiem rotacyjnym.',
    description: 'Modułowa maszynka Alpha Up oferuje wymienną obudowę w zestawie (złota, czarna, czerwona), japońskie ostrza Black Diamond Carbon DLC oraz płynną regulację dźwigni.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/946/minigallery/thumb_large_ae4d1bcbcdb7e9d0d916091edfa1c823.png'
    ],
    specs: {
      'Silnik': 'Rotacyjny 7200 RPM',
      'Ostrze': '45 mm DLC Faper Blade',
      'Bateria': '240 minut (podwójna bateria litowo-jonowa)',
      'W zestawie': '3 wymienne obudowy, stacja dokująca, 5 nasadek magnetycznych'
    }
  },
  {
    id: 'xcell-s-black',
    slug: 'gamma-x-cell-s',
    name: 'Suszarka Gamma Più XCell S - czarny',
    brand: 'Gamma Più',
    category: 'suszarki',
    price: 1299,
    currency: 'PLN',
    badge: 'Bestseller',
    shortDescription: 'Ultra-zaawansowana technologia suszenia z silnikiem cyfrowym 110 000 RPM.',
    description: 'Gamma Più XCell S to rewolucyjna ultralekka suszarka fryzjerska ważąca zaledwie 290g. Wyposażona w mikroprocesor sterujący, technologię jonizacji 2.0 oraz 4 dysze koncentrujące i dyfuzor.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_8e523db4d6a089758922fe308fcb8056.jpg'
    ],
    specs: {
      'Silnik': 'Cyfrowy bezszczotkowy 110 000 RPM',
      'Moc': '1600 W',
      'Poziom hałasu': 'Zaledwie 63 dB (najcichsza na rynku)',
      'Waga': '290 g',
      'Jonizacja': 'Generator jonów ujemnych'
    }
  },
  {
    id: 'xcell-s-gold',
    slug: 'gamma-x-cell-s-1',
    name: 'Suszarka Gamma Più XCell S - różowe złoto',
    brand: 'Gamma Più',
    category: 'suszarki',
    price: 1299,
    currency: 'PLN',
    badge: 'Bestseller',
    shortDescription: 'Edycja limitowana Rose Gold suszarki XCell S o wadze zaledwie 290g.',
    description: 'Prestiżowa wersja suszarki Gamma Più XCell S w kolorze Rose Gold. Niezrównana ergonomia pracy w salonie fryzjerskim, eliminująca zmęczenie dłoni i nadgarstka.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_ed602674767b15567c6db0b3b373f689.jpg'
    ],
    specs: {
      'Silnik': '110 000 RPM bezszczotkowy',
      'Moc': '1600 W',
      'Waga': '290 g',
      'Kolor': 'Rose Gold / Różowe złoto'
    }
  },
  {
    id: 'barber-phon',
    slug: 'gamma-barber-phon-1',
    name: 'Suszarka Barber Phon - czarny',
    brand: 'Gamma Più',
    category: 'suszarki',
    price: 499,
    currency: 'PLN',
    badge: 'Barber Choice',
    shortDescription: 'Specjalnie zaprojektowana suszarka dla Barberów z funkcją suszenia brody.',
    description: 'Pierwsza profesjonalna suszarka dedykowana dla barberów. Precyzyjne zoptymalizowany strumień i temperatura zapobiegają podrażnieniom skóry twarzy podczas modelowania brody i wąsów.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_d050a81d44a1b8390f29456bb54a0529.jpg'
    ],
    specs: {
      'Moc': '2000 W',
      'Funkcja': 'Chłodna dysza Cold Barrel do modelowania',
      'Zastosowanie': 'Włosy i broda'
    }
  },
  {
    id: 'plasma-new',
    slug: 'gamma-plasma-new',
    name: 'Suszarka Plasma Bactericidal',
    brand: 'Gamma Più',
    category: 'suszarki',
    price: 749,
    currency: 'PLN',
    badge: 'Innowacja',
    shortDescription: 'Działanie bakteriobójcze i odkażające z technologią lampy ozonowej.',
    description: 'Jedyna suszarka na świecie z aktywnym emiterem tlenu Plasma Oxygen, potwierdzona testami laboratoryjnymi redukcja bakterii o 99,9% podczas suszenia.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_032b9812664a5a52fb022e5ce880c61b.jpg'
    ],
    specs: {
      'Moc': '2000 W',
      'Technologia': 'Active Oxygen Bactericidal Technology',
      'Efekt': 'Błyszczące, zdezynfekowane włosy bez puszenia'
    }
  },
  {
    id: 'saber-ii-black',
    slug: 'maszynka-stylecraft-saber-ii-czarny',
    name: 'Maszynka StyleCraft Saber II - czarny',
    brand: 'StyleCraft',
    category: 'maszynki',
    price: 1249,
    currency: 'PLN',
    badge: 'Premium',
    shortDescription: 'Metalowa obudowa, cyfrowy silnik bezszczotkowy 7500 RPM.',
    description: 'Druga generacja legendarnej maszynki Saber. Całkowicie metalowy korpus, niespotykana trwałość, cichy silnik o wysokim momencie obrotowym.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_8b4176333a699d9e8509c5c99bbff2a0.jpg'
    ],
    specs: {
      'Silnik': 'Cyfrowy bezszczotkowy 7500 RPM',
      'Obudowa': 'Pełen odlew aluminiowy',
      'Czas pracy': '360 minut (6 godzin!)'
    }
  },
  {
    id: 'saber-ii-gold',
    slug: 'maszynka-stylecraft-saber-ii-zloty',
    name: 'Maszynka StyleCraft Saber II - złoty',
    brand: 'StyleCraft',
    category: 'maszynki',
    price: 1249,
    currency: 'PLN',
    badge: 'Premium',
    shortDescription: 'Luksusowa złota edycja maszynki Saber II z silnikiem bezszczotkowym.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_74ee3f0b6013acc56da3ab3fec232438.jpg'
    ],
    description: 'Złote wykończenie w technologii PVD odporne na ścieranie i chemikalia fryzjerskie. Najdłuższy czas pracy w klasie premium.'
  },
  {
    id: 'boosted-one-foil',
    slug: 'golarka-boosted-one-foil',
    name: 'Golarka Gamma Più Boosted One Foil',
    brand: 'Gamma Più',
    category: 'golarki',
    price: 369,
    currency: 'PLN',
    badge: 'Hit Cenowy',
    shortDescription: 'Kompaktowa golarka jednofoliowa z silnikiem 9000 RPM.',
    description: 'Idealna do golenia na gładko i wykańczania fade’ów. Ultra-cienka hipoalergiczna folia tytanowa zapobiega zacięciom i podrażnieniom.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_ed602674767b15567c6db0b3b373f689.jpg'
    ]
  },
  {
    id: 'rebel-shaver',
    slug: 'stylecraft-sc-rebel-1',
    name: 'Golarka StyleCraft Rebel',
    brand: 'StyleCraft',
    category: 'golarki',
    price: 439,
    currency: 'PLN',
    badge: 'Bestseller',
    shortDescription: 'Najmocniejsza podwójna golarka StyleCraft z silnikiem 11 000 RPM.',
    description: 'Najpotężniejsza golarka foliowa na rynku. Dwie niezależne głowice tnące z ultra-cienką złotą folią tytanową.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_032b9812664a5a52fb022e5ce880c61b.jpg'
    ]
  },
  {
    id: 'zestaw-instinct',
    slug: 'zestaw-instinct',
    name: 'Zestaw StyleCraft Instinct (Maszynka + Trymer)',
    brand: 'StyleCraft',
    category: 'zestawy',
    price: 1599,
    currency: 'PLN',
    badge: 'Promocja Zestaw',
    shortDescription: 'Kompletny zestaw: maszynka z silnikiem wektorowym IN2 + trymer Instinct.',
    description: 'Zestaw Instinct łączy maszynkę z innowacyjnym silnikiem Intuitive Torque Control (zwiększa moment obrotowy przy gęstych włosach) oraz precyzyjny trymer.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_8b4176333a699d9e8509c5c99bbff2a0.jpg'
    ]
  },
  {
    id: 'zestaw-saber-black',
    slug: 'zestaw-saber-czarny',
    name: 'Zestaw StyleCraft Saber - czarny',
    brand: 'StyleCraft',
    category: 'zestawy',
    price: 1699,
    currency: 'PLN',
    badge: 'Zestaw Barber',
    shortDescription: 'Zestaw Maszynka Saber II + Trymer Saber w eleganckim czarnym etui.',
    description: 'Pełny profesjonalny komplet stanowiskowy w czarnym wykończeniu matowym.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_74ee3f0b6013acc56da3ab3fec232438.jpg'
    ]
  },
  {
    id: 'ostrze-xpro-pvd',
    slug: 'ostrze-stale-x-pro-pvd-niebieskie',
    name: 'Ostrze stałe X-Pro PVD niebieskie',
    brand: 'Gamma Più',
    category: 'czesci',
    price: 119,
    currency: 'PLN',
    badge: 'Część Oryginalna',
    shortDescription: 'Precyzyjne ostrze ze stali japońskiej z powłoką PVD zapobiegającą nagrzewaniu.',
    description: 'Oryginalne ostrze wymienne do trymerów Gamma Piu i StyleCraft. Powłoka PVD zmniejsza tarcie o 40%.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_8e523db4d6a089758922fe308fcb8056.jpg'
    ]
  },
  {
    id: 'tight-guards',
    slug: 'nasadki-dystansowe-thight-guards-rozowe',
    name: 'Nasadki dystansowe Tight Guards - różowe',
    brand: 'Gamma Più',
    category: 'akcesoria',
    price: 149,
    currency: 'PLN',
    badge: 'Akcesorium',
    shortDescription: 'Zestaw precyzyjnych magnetycznych nasadek dystansowych.',
    description: 'Nasadki z podwójnymi magnesami neodymowymi, które nigdy nie zsuwają się z ostrza podczas pracy.',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_d050a81d44a1b8390f29456bb54a0529.jpg'
    ]
  },
  {
    id: 'flow-comb',
    slug: 'grzebien-flow-comb-niebieski',
    name: 'Grzebień fryzjerski Flow Comb - niebieski',
    brand: 'Gamma Più',
    category: 'akcesoria',
    price: 39,
    currency: 'PLN',
    badge: 'Akcesorium',
    shortDescription: 'Antystatyczny, odporny na temperaturę grzebień ze specjalnym zębem dzielącym.',
    description: 'Wykonany z włókna węglowego grzebień do precyzyjnego strzyżenia maszynką na grzebieniu (clipper-over-comb).',
    images: [
      'https://gammapiu-polska.pl/public/upload/catalog/product/922/minigallery/thumb_xlarge_032b9812664a5a52fb022e5ce880c61b.jpg'
    ]
  }
];
