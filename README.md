
<h1 align="center">
  Portfolio 2.0 / Playground
</h1>

## 🚀 

### Steps to reproduce basic gatsby app with docker for local development:
---
**Pick your poison NPM or Yarn.** [gatsby-cli](https://www.gatsbyjs.com/docs/reference/gatsby-cli)
- `npm install --global gatsby-cli` 
- `yarn add global gatsby-cli`
---

We then run `gatsby new` where we want to create our project. and we follow the prompt for setting up a new project.
Without docker we can jut start working on the project with:
- `yarn install && yarn develop`
- or
- `npm install && npm run develop`
---
The following is my development `Dockerfile`
```
FROM node:18

RUN yarn global add gatsby-cli

WORKDIR /app
COPY ./package.json .
RUN yarn install && yarn cache clean

CMD [ "yarn", "develop" , "-H", "0.0.0.0"]
```
And my accompanying `docker-compose.yml` because who uses docker locally without compose?

```
version: "3"
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8000:8000
    volumes:
      - /app/node_modules
      - .:/app
```

**Important Note Here**
Even though we expose port 8000 in the compose file we still needed to add a host modification flag in the `Dockerfile` if we want to access our app on our host machines localhost.
```
CMD [ "yarn", "develop" , "-H", "0.0.0.0"]
```

Then for `.dockerignore` we have the following at a bare minimum.
```
.cache/
node_modules/
public/
```