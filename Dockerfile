FROM node:10-alpine

WORKDIR /usr/app

COPY packge.json yarn.log ./

RUN yarn

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]