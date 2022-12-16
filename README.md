# Project LT Web BackEnd

## List API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/aviation-pilot-15735490/workspace/ltweb/collection/16210847-d3de4208-6e02-484d-829b-ff7aa66180f1?action=share&creator=16210847)
<br>
Admin account: `admin@mail.com` - `123456`

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
