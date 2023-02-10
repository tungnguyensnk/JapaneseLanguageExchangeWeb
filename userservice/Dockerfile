FROM php:fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install PHP Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN set -ex
RUN apk --no-cache add postgresql-dev
RUN docker-php-ext-install pdo_pgsql

# Copy existing application directory
COPY . .

#RUN chmod -R 777 storage/ bootstrap/ vendor/