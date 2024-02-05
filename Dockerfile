FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env . 

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]