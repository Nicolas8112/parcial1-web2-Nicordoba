FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://user:password@localhost:5432/apibiblioteca?schema=public" npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
