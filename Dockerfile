FROM node:18

RUN yarn global add gatsby-cli

WORKDIR /app
COPY ./package.json .
RUN yarn install && yarn cache clean

CMD [ "yarn", "develop" , "-H", "0.0.0.0"]
