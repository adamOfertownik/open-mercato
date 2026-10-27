FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    curl \
    icu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libxml2-dev \
    oniguruma-dev \
    mysql-client \
    make \
    linux-headers

# Configure & Install PHP extensions required by Sylius
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        intl \
        pdo_mysql \
        gd \
        zip \
        opcache \
        exif \
        bcmath \
        sodium

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Set working directory
WORKDIR /var/www/sylius

# Copy PHP config
RUN echo "memory_limit = 1024M" > /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize = 32M" >> /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "post_max_size = 32M" >> /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/memory-limit.ini

EXPOSE 9000
CMD ["php-fpm"]
