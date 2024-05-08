#!/usr/bin/env bash

npm run build
cp -r ./dist ./build

rm CAB230.zip 2>/dev/null
7z a CAB230.zip "$(ls | grep -v dist | grep -v node_modules | grep -v README.md)"

rm -r build/
