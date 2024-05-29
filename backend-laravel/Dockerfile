FROM php:8.2.19RC1-zts-alpine3.19
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN adduser -D victor
USER victor
WORKDIR /var/www/html