FROM node:alpine AS builder

RUN apk add --no-cache bash
WORKDIR /home/node/app/client

COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
COPY ./client/webpack.config.js ./
COPY ./client/src ./src
COPY ./client/public ./public

COPY ./shared ../shared

#RUN npm install npm@latest -g
RUN npm ci

RUN chown -R node:node "/root/.npm/"
#USER node
RUN npm run build
#CMD ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=builder /home/node/app/client/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

