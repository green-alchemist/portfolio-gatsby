# Gatsby Dockerfile
FROM node:20

RUN yarn global add gatsby-cli
RUN gatsby telemetry --disable
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8000

# Start the development server
CMD [ "yarn", "dev", "-H", "0.0.0.0"]