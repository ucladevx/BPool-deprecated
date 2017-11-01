setup:
	./setup.sh

stack:
	python stack_gen.py

build:
	sudo docker-compose build

dev-deploy: build
	sudo docker-compose up

deploy:
	sudo docker-compose up -d

stop:
	-sudo docker ps | tail -n +2 | cut -d ' ' -f 1 | xargs sudo docker kill

docker-reset:
	-sudo docker ps -a | tail -n +2 | cut -d ' ' -f 1 | xargs sudo docker rm
	-sudo docker images | tail -n +2 | tr -s ' ' | cut -d ' ' -f 3 | xargs sudo docker rmi --force