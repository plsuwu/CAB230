#!/usr/bin/env bash

MYSQL_PWD="Cab230!" # ahhh its fine
NVIM_CONFIG_HOME="$HOME/.config/nvim"

printf "updating apt repos + installing neovim:\n"

sudo apt-get update && sudo apt-get upgrade
sudo apt-get install neovim node-typescript

printf 'writing dump.sql to databse:\n'

sudo mysql --password="$MYSQL_PWD" < dump.sql

printf 'setup node + packages and then building:\n'

npm install -g pm2
npm ci
npm run build

prinf 'setup ok (propbabky) + dont forget dotenv :))\n'
