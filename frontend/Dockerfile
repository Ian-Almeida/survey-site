FROM node:lts-alpine

EXPOSE 8080 
EXPOSE 8081

WORKDIR /app

COPY package*.json ./

RUN npm install --force
RUN npm install @vue/cli -g

COPY . .

CMD ["npm", "run", "serve"]
