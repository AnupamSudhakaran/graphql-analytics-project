<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## How See the GraphQL UI
After a successful startup please open your browser and go the link localhost:3000/graphql [This will give a beautiful UI to interact with the queries and mutations] though i have added a sample query in the mentioned file.
Also have used apollo server  (Much better UI -- you might need network connection though).

## Filing Data

```
The CSV Sheet has a small problem with data 
make sure you have all the _id feilds has string , niether UUID(Lack of native support) or ObjectId(Diffrent format is accepted) do not work.

the ordes field where there are products by default makes it a string so have wrote a small script to change it to a better Object Dataype 

please call this curl after starting up the service 

    ```
    curl --location --request POST 'localhost:3000/analytics/v1/adjust-to-model'
    ```
```
## About CodeBase

```
Once you start the application using  npm run start:dev please checkout the url 

localhost:3000/graphql -- which will provide a UI to work with all the Queries and mutations

Have divided the content into diffrent modules 

analytics
Is the heart 
has the resolver ,logic  and all the aggregations

graph-models 
has graphql objects

input-type.models 
has graphql inputypes

models 
The mongoDb schemas


have put a sample query in the queries.graphql file, others queries can be found in the above specified URL


Have enabled caching in getCustomerSpends Query 

Have put indexs which are visible in the Mongo Schemas also running the code once will shoot indexes onto the DB -- 
pelase note  _id is by default indexed 

```