FROM node:8.15-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm install \
  && npm start


FROM nginx:1.15

RUN apt-get update && apt-get -y install curl

EXPOSE 80

COPY --from=build-stage /app /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=1m --timeout=5s --start-period=5s --retries=3 CMD curl --fail localhost:80 || exit 1