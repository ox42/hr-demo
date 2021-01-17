# build stage
FROM node:lts-alpine as build-stage
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .
RUN npm run build


# production stage
FROM php:8.0-fpm as production-stage

RUN apt-get update -y \
    && apt-get install -y nginx

# PHP_CPPFLAGS are used by the docker-php-ext-* scripts
ENV PHP_CPPFLAGS="$PHP_CPPFLAGS -std=c++11"

RUN docker-php-ext-install pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY nginx-site.conf /etc/nginx/sites-enabled/default
COPY entrypoint.sh /etc/entrypoint.sh

COPY --from=build-stage /frontend/build /usr/share/nginx/html
COPY --chown=www-data:www-data ./backend/ /usr/share/nginx/html/backend

WORKDIR /usr/share/nginx/html

RUN cd backend && composer dump-autoload

EXPOSE 80
ENTRYPOINT ["sh", "/etc/entrypoint.sh"]
