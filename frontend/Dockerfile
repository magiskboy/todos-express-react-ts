ARG BACKEND_URL

FROM node:20-slim as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV VITE_BACKEND_URL=$BACKEND_URL

RUN npm run build

FROM nginx:alpine

LABEL maintainer="Nguyen Khac Thanh <nguyenkhacthanh244@gmail.com>"

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]