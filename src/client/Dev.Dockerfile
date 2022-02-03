FROM node:alpine AS builder

RUN apk add --no-cache bash
WORKDIR /home/node/app/client

ARG TITLE
ARG BACKEND_API_URL
ARG BACKEND_URL
ENV TITLE=$TITLE
ENV BACKEND_API_URL=$BACKEND_API_URL
ENV BACKEND_URL=$BACKEND_API_URL

COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
COPY ./client/webpack.config.js ./
COPY ./client/src ./src
#COPY ./client/public ./public

COPY ./shared ../shared

#RUN npm install npm@latest -g
RUN npm ci

RUN chown -R node:node "/root/.npm/"
#USER node
#RUN npm run build
CMD ["npm", "run", "start"]
