FROM node:20-slim as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim as backend

WORKDIR /app

COPY --from=build /app/build /app

COPY package.json ./

RUN npm install --only=production

COPY --from=build /app/src/drizzle/migrations /app/src/drizzle/migrations

EXPOSE 3000

CMD ["node", "src/main.js"]