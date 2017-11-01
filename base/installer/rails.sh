#! /bin/bash

echo -e "\033[0;32m ==> Setting up base app \033[0m"
echo -e "Enter app name: "
read app

# check: the app should not be named 'rails'
if [ $app = "rails" ]; then
    echo -e "\033[0;31m ==> A rails app cannot be named 'rails' \033[0m"
    exit 1
fi

# check: the app name should not name an existing directory
if [ -d $app ]; then
    echo -e "\033[0;31m ==> A directory with the name '$app' already exists. Not overwriting. \033[0m"
    exit 1
fi

# update the docker-compose.yml file with the build and volume directories
sed -i '/### MARK:rails_build/c\      context: ./'"$app"'' docker-compose.yml
sed -i '/### MARK:rails_volume/c\      - ./'"$app"':/app' docker-compose.yml

# create a rails application 
mkdir $app
cp -rv base/template/rails/* $app/
sudo docker run -it --rm --user "$(id -u):$(id -g)" \
     -v "$PWD/$app":/app -w /app rails:5 \
     rails new --skip-bundle $app /app
mv $app/$app/* $app/
rm -rf $app/$app

# sudo docker-compose run web_rails rails new $app .
# rails new $app
# cp -rv base/template/rails/* rails_app/

echo ""
echo -e "\033[0;31m ==> IMPORTANT! To use a DB with rails in docker, see \033[0m https://docs.docker.com/compose/rails/#connect-the-database"
echo -e "\033[0;31m ==> IMPORTANT! The command you should use is \033[0m dc run web_rails rake db:create"
echo -e "There are still a few steps you need to do:"
echo -e "1. Edit $app/Gemfile and remove the 'platforms' clause for the tzinfo-data gem"
echo -e "2. Delete $app/Gemfile.lock"
echo -e "3. Run 'dc run web_rails bundle install'"