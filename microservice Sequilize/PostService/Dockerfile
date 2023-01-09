FROM node:alpine

RUN npm i -g pm2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app
EXPOSE 4000


CMD [ "pm2-runtime", "start", "pm2.json" ]
