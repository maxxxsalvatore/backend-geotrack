FROM node:20-alpine

WORKDIR /app

# Install dependencies yang dibutuhkan argon2 & native modules
RUN apk add --no-co-cache python3 make g++

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]