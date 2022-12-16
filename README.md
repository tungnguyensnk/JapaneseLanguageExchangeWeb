# Project LT Web BackEnd

## Set Environment Variables

```
cp .env.example .env
```

## Build Setup

```
docker-compose up --build -d
```

## Install dependencies

```
docker-compose exec app composer install --no-scripts
```

## Config

```
docker-compose exec app php artisan key:generate
```

```
docker-compose exec app php artisan optimize
```

## Run migrations

```
docker-compose exec app php artisan migrate
```

## Run seeds

```
docker-compose exec app php artisan db:seed
```

or you can run all commands in file `init.sh`.

## Contact me for more information
[Tùng Nguyễn](https://www.facebook.com/anm19042)
