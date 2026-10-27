.PHONY: help up down restart build install fixtures import shell logs

help:
	@echo "====================================================================="
	@echo "  Sylius Open Source - Gamma Piu Polska Store"
	@echo "====================================================================="
	@echo "  make up          - Uruchomienie kontenerów Docker (PHP, Nginx, MySQL, Redis, Mailpit)"
	@echo "  make down        - Zatrzymanie kontenerów Docker"
	@echo "  make build       - Zbudowanie obrazów Docker"
	@echo "  make install     - Instalacja zależności Composer i konfiguracja bazy Sylius"
	@echo "  make fixtures    - Wgranie gotowych fixtures Gamma Piu Polska (produkty, kategorie, kanał)"
	@echo "  make import      - Uruchomienie komendy importującej produkty z gammapiu-polska.pl"
	@echo "  make shell       - Otwarcie powłoki bash wewnątrz kontenera PHP"
	@echo "  make logs        - Podgląd logów kontenerów"
	@echo "====================================================================="

up:
	docker compose up -d

down:
	docker compose down

restart: down up

build:
	docker compose build

install:
	docker compose run --rm php composer install
	docker compose run --rm php bin/console sylius:install -n --no-interaction

fixtures:
	docker compose run --rm php bin/console sylius:fixtures:load gamma_piu_polska -n --no-interaction

import:
	docker compose run --rm php bin/console app:import:gammapiu --source=data/gammapiu-products.json

shell:
	docker compose exec php bash

logs:
	docker compose logs -f
