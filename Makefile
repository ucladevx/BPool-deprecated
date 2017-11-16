ECR_REPO=870583707350.dkr.ecr.us-west-1.amazonaws.com
APP_NAME=bpool
EC2_IP=54.193.73.244

ecr-login:
	$(shell aws ecr get-login --no-include-email --region us-west-1)

setup:
	./setup.sh

stack:
	python stack_gen.py

build:
	sudo docker-compose build

dev-deploy: 
	sudo docker-compose up

deploy:
	sudo docker-compose up -d

stop:
	-sudo docker ps | tail -n +2 | cut -d ' ' -f 1 | xargs sudo docker kill

docker-reset:
	-sudo docker ps -a | tail -n +2 | cut -d ' ' -f 1 | xargs sudo docker rm
	-sudo docker images | tail -n +2 | tr -s ' ' | cut -d ' ' -f 3 | xargs sudo docker rmi --force


build-aws:
	docker build ./node_app -t $(APP_NAME)

push: ecr-login
	docker tag $(APP_NAME):latest $(ECR_REPO)/$(APP_NAME):latest
	docker push $(ECR_REPO)/$(APP_NAME):latest

ssh:
	ssh ubuntu@$(EC2_IP) -i id_rsa_bpool

depoly: ecr-login
	sudo docker-compose pull
	sudo docker-compose up
	
