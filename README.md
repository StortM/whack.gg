# db-mandatory-2

This is a Node.js application using NestJS.

The only local dependencies required are `docker`.

## Environment Variables

New environment variables must be added to `.env.ci` and `.env.example`.

```
PORT=3001 (port for backend)
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
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
