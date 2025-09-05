FROM node:20.18-bookworm AS build

WORKDIR /app

COPY . .
RUN npm install && npm run web-build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/scripts/nginx.conf /etc/nginx/nginx.conf
