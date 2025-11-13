# Variables
BUN ?= bun
BUNX ?= bunx
BIOME ?= biome
FILES ?= src/

RUN = $(BUN) run

COMPOSE_DEV = docker/compose.dev.yml
COMPOSE_PROD = docker/compose.prod.yml

ENV_DEV = .env
ENV_PROD = .env.prod

DOCKER_COMPOSE_DEV = docker compose --env-file $(ENV_DEV) -f $(COMPOSE_DEV)
DOCKER_COMPOSE_PROD = docker compose --env-file $(ENV_PROD) -f $(COMPOSE_PROD)

# Next.js main commands
install:
	$(BUN) install

dev:
	$(RUN) dev

build:
	$(RUN) build

start:
	$(RUN) start

# Linting and formatting
lint:
	${BUNX} $(BIOME) lint --write $(FILES)

format:
	${BUNX} $(BIOME) format --write $(FILES)

check:
	${BUNX} $(BIOME) check --write $(FILES)

# Git hooks and precommit
precommit:
	$(RUN) precommit

prepare:
	$(RUN) prepare

# Tests
test:
	$(RUN) test

test-watch:
	$(RUN) test:watch

test-e2e:
	$(RUN) test:e2e

# Prisma
migrate-dev:
	${BUNX} prisma migrate dev

migrate-prod:
	${BUNX} prisma migrate deploy

migrate-reset:
	${BUNX} prisma migrate reset

studio:
	${BUNX} prisma studio

seed:
	${BUNX} prisma db seed

# Docker

## Dev
up-dev:
	$(DOCKER_COMPOSE_DEV) up -d --build

down-dev:
	$(DOCKER_COMPOSE_DEV) down

logs-dev:
	$(DOCKER_COMPOSE_DEV) logs -f

restart-dev:
	$(DOCKER_COMPOSE_DEV) down
	$(DOCKER_COMPOSE_DEV) up -d --build

## Prod
up-prod:
	$(DOCKER_COMPOSE_PROD) up -d --build

down-prod:
	$(DOCKER_COMPOSE_PROD) down

logs-prod:
	$(DOCKER_COMPOSE_PROD) logs -f

restart-prod:
	$(DOCKER_COMPOSE_PROD) down
	$(DOCKER_COMPOSE_PROD) up -d --build

# Optional cleaning
clean:
	rm -rf .next node_modules
