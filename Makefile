
# docker
build:
	docker build -t field ./ ; docker run -p 5432:5432 -d --name field  field

# db init
migrate:
	./ace migration:refresh

seed:
	./ace db:seed

setup:
	make migrate
	make seed

