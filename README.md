# db-mandatory-2

This is a Node.js application using NestJS.

The only local dependencies required are `docker`.

## Environment Variables

New environment variables must be added to `.env.ci` and `.env.example`.

```
# Server
TOKEN_SECRET=someSecret
PORT=3001
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Postgres
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=POSTGRES_DB

# PG Admin
PGADMIN_DEFAULT_EMAIL=mail@example.com
PGADMIN_DEFAULT_PASSWORD=pass

# MongoDB
DATABASE_URI="mongodb://user:pass@mongo:27017/db?directConnection=true&authSource=admin"
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=pass
MONGO_INITDB_PORT=27017

# Mongo Express 
ME_CONFIG_BASICAUTH_USERNAME=user
ME_CONFIG_BASICAUTH_PASSWORD=pass
ME_CONFIG_MONGODB_URL="mongodb://user:pass@mongo:27017"

# Neo4j
NEO4J_AUTH=none
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
NEO4J_URI=bolt://neo:7687
NEO4J_SCHEME=neo4j
NEO4J_PORT=7687
NEO4J_HOST=neo
```

## Configuring Local Development Environment

First, create an `.env` file with the above environment variables by making a copy of `.env.example`.

Next, run the development server using:
```bash
docker-compose up
```

This will start a development server on port `PORT`.

## Using NPM

First, start up the development server as described above. Next, open a new terminal and enter the container using:
```bash
docker-compose exec backend /bin/sh
```

From here you can run `npm` commands like `npm install -D typescript@latest` and `npm run test`.
Here you can also seed the database using the command `npm run seed:run`

## Logging into the platform

The platform is accessible at `http://localhost:{PORT}/`.
The login endpoint is `POST auth/login`. The credentials for the test users are:
```bash
Admin user
summonerName: "KHK TLamp"
password: "test1"

Regular user
summonerName: "Dayns"
password: "test2"

Regular user
summonerName: "DrÎ±chun"
password: "test3"
```

A succesful login attempt will return a JWT token. This token must be included in the `Authorization` header as a bearer token of all subsequent requests.

## Tests

To run the tests, first start up the development server as described above. Next, open a new terminal and enter the container using:
```bash
docker-compose exec backend /bin/sh
```

From here you can run `npm run test` to run all unit tests and `npm run test:integration` to run all integration tests.
Please note that only the sql related endpoints are tested.