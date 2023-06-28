FROM node:alpine

ENV SERVICE_TYPE = "docker"

WORKDIR /usr/app

COPY package.json /usr/app/

COPY server.js /usr/app/

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]