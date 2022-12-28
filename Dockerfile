FROM node:18

RUN yarn global add gatsby-cli
RUN gatsby telemetry --disable

WORKDIR /app
COPY ./package.json .
RUN yarn install

CMD [ "yarn", "develop", "-H", "0.0.0.0"]
