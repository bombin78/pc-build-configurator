# pc-build-configurator

Конфигуратор сборки ПК на Next.js 16. Пользователь выбирает комплектующие
по категориям и сохраняет сборку. В списке сборок видна общая цена.
Сохранённую сборку можно отредактировать и опубликовать. Публичные сборки
других пользователей собраны на отдельной странице, и им можно ставить лайки.

Проект начат по учебному курсу, дальше развиваю его сам.


## Технологии

- **Next.js 16** (App Router) и **React 19**
- **TypeScript**
- **PostgreSQL** и **Prisma 7** для работы с базой
- **Docker Compose**: база и приложение в контейнерах
- **Auth.js** (`next-auth` v5): вход по логину и паролю, пароли хешируются
  через `bcryptjs`. Логин сайт создаёт сам при регистрации, имя и email
  не запрашиваются
- **Tailwind CSS 4** и компоненты **shadcn/ui**

## Страницы

| Адрес | Файл | Что там |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | главная |
| `/signup` | [app/signup/page.tsx](app/signup/page.tsx) | регистрация |
| `/login` | [app/login/page.tsx](app/login/page.tsx) | вход |
| `/dashboard` | [app/dashboard/page.tsx](app/dashboard/page.tsx) | конфигуратор, только после входа |
| `/builds` | [app/builds/page.tsx](app/builds/page.tsx) | мои сборки, только после входа |
| `/builds/explore` | [app/builds/explore/page.tsx](app/builds/explore/page.tsx) | публичные сборки, только после входа |
| `/builds/[buildId]/edit` | [app/builds/[buildId]/edit/page.tsx](<app/builds/[buildId]/edit/page.tsx>) | редактирование сборки, только после входа |

Без входа [proxy.ts](proxy.ts) перенаправляет с закрытых страниц на `/login`.

## Требования

- **Node.js** 20.19+, 22.12+ или 24+ — так требует Prisma 7. Образ
  в Docker собирается на Node.js 24.
- **Docker** с плагином **Docker Compose** — для базы, а в варианте
  «Запуск в Docker» и для приложения.

## Запуск

1. Создать в корне файл `.env` с переменными:

   ```bash
   POSTGRES_USER=pc_build_configurator
   POSTGRES_PASSWORD=...
   POSTGRES_DB=pc_build_configurator
   DATABASE_URL=postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>
   NEXTAUTH_SECRET=...
   ```

   `POSTGRES_*` читает [docker-compose.yml](docker-compose.yml) при создании
   базы. `DATABASE_URL` читает Prisma. `NEXTAUTH_SECRET` передаётся в Auth.js
   в [auth.ts](auth.ts): из него Auth.js получает ключ, которым шифрует куку
   сессии.

   - `NEXTAUTH_SECRET` можно сгенерировать командой `openssl rand -base64 32`.
   - Пароль базы лучше брать только из букв и цифр, например
     `openssl rand -hex 24`. Он входит в `DATABASE_URL`, а символы `/`, `+`,
     `@` там нужно кодировать.
   - `NEXTAUTH_URL` локально задавать не нужно, по умолчанию будет
     `http://localhost:3000`. На сервере здесь указывают адрес сайта.

2. Установить зависимости:

   ```bash
   npm install
   ```

3. Запустить только контейнер с PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

   Без `postgres` в конце Docker Compose запустит ещё и приложение
   в контейнере на порту 3000, и `npm run dev` не сможет его занять.

   Проверить, что он работает: `docker compose ps` — в `STATUS` должно
   стоять `Up`.

4. Применить миграции, сгенерировать клиент Prisma и заполнить базу
   комплектующими:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed
   ```

   Клиент генерируется в `lib/generated/prisma` (папка не хранится в git).
   Данные для заполнения — в [prisma/seed.ts](prisma/seed.ts).

   Seed сначала удаляет всех пользователей, сборки и лайки. Запускать его
   нужно на пустой базе. Он создаёт тестового пользователя с логином `test`
   и паролем `12345678`. Форма входа показывает этот логин и пароль всем
   посетителям, чтобы с сайтом можно было познакомиться без регистрации.
   Поэтому сборки тестового пользователя может изменить любой посетитель.

5. Запустить сервер разработки:

   ```bash
   npm run dev
   ```

   Адрес: [http://localhost:3000](http://localhost:3000).

## Запуск в Docker

Так приложение работает на сервере: Next.js собирается в образ
и запускается в контейнере рядом с базой. Нужен только файл `.env`
из шага 1. Node.js и `npm install` не нужны: всё необходимое есть в образе.

1. Собрать образ и запустить оба контейнера:

   ```bash
   docker compose up -d --build
   ```

   При каждом запуске контейнер `app` сам применяет миграции
   (`prisma migrate deploy`), потом запускает Next.js.

2. Один раз заполнить пустую базу. Seed запускается внутри контейнера `app`:

   ```bash
   docker compose exec app npx --yes tsx@4.23.0 prisma/seed.ts
   ```

   Seed написан на TypeScript, его запускает `tsx`. В образе `tsx` нет
   (он в `devDependencies`), поэтому `npx` один раз скачивает его в кэш
   npm внутри контейнера. Версия та же, что в `package-lock.json`.

   На компьютере с `npm install` вместо этого можно выполнить
   `npx prisma db seed`: команда подключится к базе через порт 5432,
   открытый только для `127.0.0.1`.

3. Открыть сайт: на компьютере — [http://localhost:3000](http://localhost:3000),
   на сервере — `http://<адрес сервера>:3000`. На сервере в `.env` нужно
   задать `NEXTAUTH_URL` с тем же адресом.

Выложить новую версию на сервер:

```bash
git pull
docker compose up -d --build
```

Миграции из новой версии применятся сами при запуске контейнера `app`.
`.env` и база при этом не меняются. Старые образы после пересборки
остаются на диске, удалить их можно командой `docker image prune`.

Полезные команды:

- `docker compose ps` — состояние контейнеров;
- `docker compose logs -f app` — вывод приложения;
- `docker compose stop` — остановить, ничего не удаляя;
- `docker compose down` — удалить контейнеры, база остаётся в томе;
- `docker compose down -v` — удалить контейнеры и том, база будет стёрта.

Одновременно с `npm run dev` этот вариант не работает: оба хотят порт 3000.
Чтобы вернуться к разработке, выполните `docker compose stop app`.

## Просмотр базы в браузере (Prisma Studio)

Контейнер с PostgreSQL должен быть запущен: `docker compose up -d postgres`.

```bash
npx prisma studio
```

Адрес: `http://localhost:5555`.

Полезные флаги:

- `--port 5556` — другой порт, если занят 5555;
- `--browser firefox` — открыть в конкретном браузере.
