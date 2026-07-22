FROM node:20-alpine

WORKDIR /app

# Install build dependencies untuk argon2 & native modules
RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY prisma ./prisma/

# Tambahkan flag --legacy-peer-deps di sini
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]