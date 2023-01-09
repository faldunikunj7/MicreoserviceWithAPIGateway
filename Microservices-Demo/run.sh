#!/usr/bin/bash

npm i -g pm2

cd APIGateway
npm i
pm2 start pm2.json

cd ../AuthService
npm i
pm2 start pm2.json

cd ../UserService
npm i
pm2 start pm2.json

cd ../PostService
npm i
pm2 start pm2.json