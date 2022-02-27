FROM node:lts-alpine

EXPOSE 8080 
EXPOSE 8081

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json /frontend/package.json

# COPY package*.json ./

RUN npm install 
RUN npm install -g @quasar/cli

COPY . .

CMD ["quasar", "dev"]
