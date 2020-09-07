FROM node:alpine

WORKDIR /userDetails

COPY package.json .

RUN npm install 

COPY . .

CMD [ "npm start" ]