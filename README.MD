#  social-media-react-express

Social media full-stack webapp built with Typescript, React, Express & MongoDB 

## About

This is a social media app written in TS with Express, MongoDB on the backend & with React, Redux and Redux-saga on the client. Uses Websockets for instant messaging. Deployed with Docker & Nginx 

### Built With

* Client:
    * Typescript, React, React-router, Redux with Redux Toolkit,
     Redux-Saga, Socket.IO, SCSS Modules   
* Server:
    * Typescript, Express, Mongoose, MongoDB, bcrypt, Socket.IO
* Other: Docker, Docker Compose, Nginx

### Key Features

* Session Authentication
* Create posts or reply with text and images
* Ability to leave a like on a post
* Ability to make a repost
* Realtime direct messages with Websockets
* Simple post search
* Post feed page

### Screenshots / Images

TODO: Add images here <-

### Network setup

![Network setup](https://github.com/fdr-smnv/social-media-react-express/blob/master/docs/network.jpeg?raw=true)

## Getting Started

### Prerequisites

The things you need before running the software:

* Docker
* Docker Compose

### Local Deployment

To deploy on local machine use this command:

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```


###  Deployment

* Follow this [article](https://archive.is/nuyBs) to set up SSL certificates.

* Look through docker compose config and change up environment variables to suit your website.

* Run this command to deploy:

```
$ docker-compose up -d --build
```

