FROM node:alpine

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY ./src ./src
