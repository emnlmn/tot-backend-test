.PHONY: setup sh usage test build-image

usage:
	@echo "select target"

setup:
	docker-compose run node yarn install
	docker-compose run node yarn db:migrate

sh:
	docker-compose up -d
	docker-compose exec node sh

test:
	docker-compose exec node yarn test

build:
	docker-compose exec node yarn build

build-image:
	docker build -t user-service:latest -f docker/Dockerfile .
