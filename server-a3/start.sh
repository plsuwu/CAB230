#!/usr/bin/env bash

# run below if err `ERROR 1273 (HY000) at line 1: Uknown collation: 'uf8mb4_0900_ai_ci'`
# sed -i 's/utf8mb4_0900_ai_ci/utf8mb4_general_ci/g' volcanoes.sql

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
