run:
	docker-compose up -d --build

update:
	docker-compose up -d --no-deps --build hr_web

deps:
	cd frontend && npm install

test:
	cd frontend && npm run test
