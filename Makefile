SHELL := /bin/bash

vite-dev:
	docker compose up vite-react-app

psql-up:
	docker compose up db

asp-dev:
	docker compose up asp-api

asp-migrate:
	docker-compose exec asp-api dotnet ef database update

asp-shell:
	docker-compose exec asp-api sh