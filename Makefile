.PHONY: help build up down test lint migrate execute-runbook

help:
	@echo "Runbook Automation Platform - Management Commands"
	@echo "----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "execute-runbook    : Execute a sample operational runbook"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

execute-runbook:
	docker-compose exec api python scripts/execute/run.py --runbook "incident_response_v1"
