# db-mandatory-2

This is a Node.js application using NestJS.

The only local dependencies required are `docker`.

## Creating a repository using this template
On the landing page of this repository click the `Use this template` button and enter the details for your repository.

## Configuring your GitHub repository
When configuring your GitHub repository, remember to create a production branch. We have not created it in the template repository beforehand because it would result in merge errors due to unrelated histories after duplicating the template repository. Afterwards, set up branch protection rules. This can be done by going to `Settings` and then the `Branches` tab on your repository.

If you don't know which rules to configure please refer to [how-we-use-github](https://github.com/Kvalifik/how-we-work/blob/staging/how-we-use-github.md#branch-rules).

Do also keep in mind that no GitHub secrets are transfered from this repository, and need to be added from scratch in your new repository. You should add the following Google cloud platform secrets:
```
GCP_PROJECT_ID_PRODUCTION
GCP_PROJECT_ID_STAGING
GCP_SA_KEY_PRODUCTION
GCP_SA_KEY_STAGING
GCP_SA_KEY_TERRAFORM_STATE
```
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
