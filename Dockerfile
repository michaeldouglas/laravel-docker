FROM php:7.0-fpm

MAINTAINER Michael Araujo <michaeldouglas010790@gmail.com>

ENV TERM xterm
ENV HOME /var/www/

# Instalação da máquina
RUN apt-get update && apt-get install -y \
    libpq-dev \
    curl \
    libjpeg-dev \
    libpng12-dev \
    libfreetype6-dev \
    libssl-dev \
    libmcrypt-dev \
    nginx \
    --no-install-recommends

# configure gd library
RUN docker-php-ext-configure gd \
    --enable-gd-native-ttf \
    --with-jpeg-dir=/usr/lib \
    --with-freetype-dir=/usr/include/freetype2

# Install mongodb, xdebug
RUN pecl install mongodb \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install extensions using the helper script provided by the base image
RUN docker-php-ext-install \
    mcrypt \
    pdo_mysql \
    pdo_pgsql \
    gd \
    zip

# Install other tools
RUN apt-get install supervisor net-tools vim -y

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN usermod -u 1000 www-data

COPY config/laravel/laravel.ini /usr/local/etc/php/conf.d
COPY config/laravel/laravel.pool.conf /usr/local/etc/php-fpm.d/
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY config/supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN usermod -u 1000 www-data

# Informa a pasta de trabalho da aplicação
WORKDIR $HOME/laravel/

# Retorna para o usuário root
USER root

# Copia a aplicação
COPY ./ $HOME/laravel/

# Default command
CMD ["/usr/bin/supervisord"]

EXPOSE 80 443