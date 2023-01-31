# Roulette

## Description
This repository contains a  example of a Nest.js server connected to a microservice] for generating random numbers. The server is built using NestJS framework, TypeScript, for database I use Postgres with TypeORM andRabbitMQ is a messaging broker - an intermediary for messaging between microservices.

[Link To Consumer Microservice]("http://"")

The main server has one endpoint which responsible for user request and trigger event to the microservice to generate a random number then  it publishing it to the main server․

For the endpoint test, I use unit and integration tests.
Unit test - I am testing roulette.service, it implements the entire method except saving it in db (mocked Repository.save() method).
Integration tests -  For that, I also tested the database for saving random numbers in DB. I use a test database which before starting initialize a new DB, and insert data, after it cleans all db.

### Warning
I also create DockerFile and docker-compose but it is not finished there are some bugs.
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn  start:dev

```
## Test

```bash
# unit tests
$ yarn test
```
