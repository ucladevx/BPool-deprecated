#! /bin/bash

echo -e "\033[0;32m ==> Setting up base app \033[0m"
mkdir nginx_app
cp -rv base/template/nginx/* nginx_app/