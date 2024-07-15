#!/bin/sh

MYSQLHOST=db
printf "\n[*] Waiting for mysqld container to be ready."
until nc -z -v -w30 $MYSQLHOST 3306; do
    printf "..."
    sleep 5
done

printf "\n[*] Netcat connection to database success: proceeding to knex migration & seeding...\n"

npm run knex-migrate
npm run knex-seed

npm run start
