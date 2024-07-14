#!/bin/sh

MYSQLHOST=172.20.0.2
until nc -z -v -w30 $MYSQLHOST 3306; do
    sleep 5
done

npm run knex-migrate
npm run knex-seed
npm run start
