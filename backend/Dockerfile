FROM node:20-slim as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim as backend

WORKDIR /app

COPY --from=build /app/build /app/build

COPY package.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "build/main.js"]