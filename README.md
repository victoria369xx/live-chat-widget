**npm run dev - запуск сервера**

### Установка и настройка PostgreSQL в Docker:

https://www.cloud4y.ru/blog/installing-and-configuring-postgre-sql/

### Запуск контейнера PostgreSQL:

docker run --name psql-container -p 5432:5432 -e POSTGRES_PASSWORD=myPassword -d postgres
(наш пароль: myPassword (как в примере))

**Необходимо установить PG-Admin (скачать приложение) или установить PG-Admin с помощью Docker:**

docker run --rm -p 5050:5050 thajeztah/pgadmin4
тогда PG-Admin будет доступен по адресу в браузере: http://localhost:5050

**Настройки сервера в PG-Admin:**

General:

&emsp;name: PostgreSQL WidgetChat

Connection:

&emsp;Host name/address: localhost

&emsp;Port: 5432

&emsp;Maintenance database: postgres

&emsp;Username: postgres

&emsp;Password: myPassword

**database**: live_chat_widget

---

### API: http://localhost:5000/api

**Questions:**

1. /question
   получение списка всех вопросов
   метод GET
   возвращается массив объектов:
   [
   &ensp;{
   &ensp;&ensp;"id": 1,
   &ensp;&ensp;"text": "first question",
   &ensp;&ensp;"createdAt": "2022-10-22T21:18:14.002Z",
   &ensp;&ensp;"updatedAt": "2022-10-22T21:18:14.002Z",
   &ensp;&ensp;"userId": 1
   &ensp;},
   &ensp;{
   &ensp;&ensp;"id": 2,
   &ensp;&ensp;"text": "2 question",
   &ensp;&ensp;"createdAt": "2022-10-22T21:33:42.816Z",
   &ensp;&ensp;"updatedAt": "2022-10-22T21:33:42.816Z",
   &ensp;&ensp;"userId": 2
   &ensp;},
   ]
2. /question
   отправление вопроса
   метод POST
   body:
   {
   &ensp;"text": STRING NOT NULL,
   &ensp;"name": STRING NOT NULL,
   &ensp;"email": STRING UNIQUE,
   &ensp;"phone": STRING UNIQUE
   }
   должно быть заполнено либо поле email, либо phone (оба NULL нельзя)
   возвращается объект:
   {
   &ensp;"id": 4,
   &ensp;"userId": 3,
   &ensp;"text": "test",
   &ensp;"updatedAt": "2022-10-22T22:06:06.537Z",
   &ensp;"createdAt": "2022-10-22T22:06:06.537Z"
   }
   также создается пользователь, если email или phone новые (роль по умолчанию ставится 1 - роль user, флаг is_reg ставится false, то есть не зарегестрированный пользователь)
   если пользователь с таким email или phone уже есть, но имя другое, то имя пользователя меняется на новое

**Users:**

1. /user
   получение списка всех пользователей
   метод GET
   возвращается массив объектов:
   [
   &ensp;{
   &ensp;&ensp;"id": 2,
   &ensp;&ensp;"name": "Anya",
   &ensp;&ensp;"email": null,
   &ensp;&ensp;"phone": "+71111111111",
   &ensp;&ensp;"password": null,
   &ensp;&ensp;"is_reg": false,
   &ensp;&ensp;"createdAt": "2022-10-22T21:33:42.774Z",
   &ensp;&ensp;"updatedAt": "2022-10-22T21:33:42.774Z",
   &ensp;&ensp;"roleId": 1
   &ensp;},
   ]

**Roles:**

1. /role
   получение списка всех ролей
   метод GET
   возвращается массив объектов:
   [
   &ensp;{
   &ensp;&ensp;"id": 1,
   &ensp;&ensp;"name": "user",
   &ensp;&ensp;"createdAt": "2022-10-22T21:11:26.832Z",
   &ensp;&ensp;"updatedAt": "2022-10-22T21:11:26.832Z"
   &ensp;},
   &ensp;{
   &ensp;&ensp;"id": 10,
   &ensp;&ensp;"name": "admin",
   &ensp;&ensp;"createdAt": "2022-10-22T21:11:41.487Z",
   &ensp;&ensp;"updatedAt": "2022-10-22T21:11:41.487Z"
   &ensp;}
   ]
2. /role
   создание новой роли
   метод POST
   body:
   {
   &ensp;"id": INTEGER NOT NULL UNIQUE,
   &ensp;"name": STRING NOT NULL UNIQUE,
   }
   возвращается объект:
   {
   &ensp;"id": 1,
   &ensp;"name": "user",
   &ensp;"createdAt": "2022-10-22T21:11:26.832Z",
   &ensp;"updatedAt": "2022-10-22T21:11:26.832Z"
   }
