FROM node:20

RUN yarn global add gatsby-cli
RUN gatsby telemetry --disable

WORKDIR /app
COPY ./package.json .
RUN yarn install

EXPOSE 8000

CMD [ "yarn", "dev", "--verbose", "-H", "0.0.0.0"]
