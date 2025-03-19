FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y default-mysql-client

COPY package.json package-lock.json . 
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]

