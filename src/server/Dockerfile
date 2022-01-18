#FROM node:alpine
#
#WORKDIR /home/node/app/
#
#COPY ./package*.json ./server/
#
#WORKDIR /home/node/app/server
#RUN npm install
#
#COPY src ./src
##COPY ../shared ../shared
#ADD ../shared ../shared


FROM node:alpine

RUN apk add --no-cache bash
WORKDIR /home/node/app/server
#RUN chown node:node ../
#USER node

COPY ./server/package*.json ./
COPY ./server/tsconfig.json ./
COPY ./server/src ./src
COPY ./shared ../shared

#RUN npm i -g concurrently tsc tsc-alias
RUN chown -R node:node "/home/node/"
RUN npm i
#&& npm cache clean --force

#COPY ./server ./
EXPOSE $PORT

#RUN chown -R node:node "/home/node/app/"
RUN chown -R node:node "/root/.npm/"
USER node
