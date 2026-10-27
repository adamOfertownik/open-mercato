# Sklep internetowy Sylius Open Source — Gamma Piu Polska

Kompletna konfiguracja i implementacja sklepu internetowego na bazie **Sylius Open Source** (PHP 8.3 / Symfony 6.4 LTS / MySQL 8 / Nginx / Redis / Docker) odwzorowująca asortyment, kategorie, kanały sprzedaży i specyfikę sklepu **[Gamma Piu Polska](https://gammapiu-polska.pl/)**.

---

## 🚀 Architektura i zawartość

Ten projekt zawiera wszystko, co niezbędne do uruchomienia sklepu na Sylius Open Source:

1. **Środowisko Docker (`docker-compose.yml`)**:
   - **PHP 8.3-FPM** z wymaganymi rozszerzeniami (`intl`, `gd`, `pdo_mysql`, `opcache`, `zip`, `bcmath`, `sodium`).
   - **Nginx 1.25** z regułami rewrite pod Sylius/Symfony.
   - **MySQL 8.0** jako baza danych sklepu.
   - **Redis 7** do obsługi cache i sesji.
   - **Mailpit** (port `8025`) do podglądu wiadomości e-mail (potwierdzenia zamówień, rejestracja).

2. **Fixtury Sylius (`config/packages/sylius_fixtures.yaml`)**:
   - **Kanał sprzedaży**: `GAMMA_PIU_PL` (Waluta: PLN, Język: `pl_PL`, strefa: Polska).
   - **Kategorie (Taxons)**:
     - *Urządzenia fryzjerskie*: Maszynki do strzyżenia, Suszarki, Trymery, Golarki, Prostownice, Lokówki.
     - *Ostrza i części zamienne*: Ostrza do maszynek, Ostrza do trymerów, Folie do golarek.
     - *Akcesoria*: Grzebienie, nasadki dystansowe, bazy ładujące, gripy.
     - *Zestawy promocyjne* oraz *Outlet*.
   - **Dostawy (Shipping Methods)**:
     - *Paczkomaty InPost 24/7* (14,99 PLN).
     - *Kurier DPD / InPost Kurier* (18,99 PLN).
     - *Odbiór osobisty w salonie w Wejherowie* (0,00 PLN).
   - **Płatności (Payment Methods)**:
     - *Przelewy24 / BLIK / Szybki Przelew*
     - *PayU / Płatność kartą*
     - *Płatność przy odbiorze (Pobranie)*
     - *Przelew tradycyjny*
   - **Cechy produktów (Attributes)**:
     - `BRAND` (Gamma Piu, StyleCraft)
     - `MOTOR_TYPE` (np. Silnik cyfrowy EON, silnik rotacyjny)
     - `WARRANTY` (24 miesiące konsument / 12 miesięcy B2B)
   - **Produkty**: Ponad 35 realnych produktów z cenami brutto (z VAT 23%), opisami, zdjęciami wysokiej rozdzielczości ze sklepu `gammapiu-polska.pl`.

3. **Komenda importująca (`src/Command/ImportGammaPiuCommand.php`)**:
   - `bin/console app:import:gammapiu` — automatyczny import/aktualizacja produktów z pliku `data/gammapiu-products.json` lub bezpośrednio z API.

---

## ⚡ Szybki start (Docker)

### 1. Uruchomienie kontenerów
```bash
cd sylius-gammapiu
make up
# lub: docker compose up -d
```

### 2. Instalacja zależności i bazy danych
```bash
make install
```

### 3. Wgranie katalogu produktów Gamma Piu Polska
```bash
make fixtures
```

### 4. Dostęp do sklepu
- **Storefront (sklep dla klientów)**: `http://localhost:8080/`
- **Panel Administracyjny Sylius**: `http://localhost:8080/admin`
  - Login: `admin@gammapiu-polska.pl`
  - Hasło: `sylius123`
- **Mailpit (podgląd maili)**: `http://localhost:8025/`

---

## 🇵🇱 Rekomendowane wtyczki (Plugins) dla polskiego e-commerce

Dla pełnej produkcyjnej integracji sklepu Gamma Piu Polska w środowisku Sylius Open Source zalecane są następujące wtyczki:

| Wtyczka | Przeznaczenie | Paczka Composer |
|---|---|---|
| **InPost Paczkomaty** | Integracja z ShipX, geowidget wyboru Paczkomatu, generowanie etykiet | `bitbag/inpost-plugin` |
| **Przelewy24** | Bramka płatności online, BLIK, raty | `bitbag/sylius-przelewy24-plugin` |
| **Faktury VAT** | Generowanie faktur PDF i korekt | `bitbag/sylius-invoice-plugin` |
| **Dyrektywa Omnibus** | Historia cen, najniższa cena z 30 dni przed obniżką | `sylius/omnibus-plugin` |
| **Płatności PayU** | Alternatywna bramka płatności | `payum/payu` |
