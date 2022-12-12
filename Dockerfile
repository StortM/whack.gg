FROM node:14-bullseye as base

# Create application directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY . .
RUN npm i

# We use Docker multi-stage builds
FROM base as development
ENV NODE_ENV=development

FROM base as test
ENV NODE_ENV=production
RUN ["npm", "run", "build"]

FROM test as production
RUN ["npm", "ci", "--only=production"]
CMD ["npm", "run", "start:dev"]

