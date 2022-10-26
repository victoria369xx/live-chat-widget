**npm run dev - запуск сервера**

### Установка и настройка PostgreSQL в Docker:

https://habr.com/ru/post/578744/
https://www.cloud4y.ru/blog/installing-and-configuring-postgre-sql/

### Запуск контейнера PostgreSQL:

В папке с файлом docker-compose.yml запустить следующие команды:\
docker-compose build\
docker-compose up -d\
PG-Admin будет доступен по адресу в браузере: http://localhost:5050

**Настройки сервера в PG-Admin:**

- General:
  - name: PostgreSQL WLC
- Connection:
  - Host name/address: localhost
  - Port: 5432
  - Maintenance database: postgres
  - Username: postgres
  - Password: myPassword
- **database**: livechat

---

### API: http://localhost:5000/api

**Questions:**

1. /question
   - получение списка всех вопросов
   - метод GET
   - возвращается массив объектов:\
     [\
      &emsp;{\
      &emsp;&emsp;"id": 1,\
      &emsp;&emsp;"text": "first question",\
      &emsp;&emsp;"createdAt": "2022-10-22T21:18:14.002Z",\
      &emsp;&emsp;"updatedAt": "2022-10-22T21:18:14.002Z",\
      &emsp;&emsp;"userId": 1\
      &emsp;},\
      &emsp;{\
      &emsp;&emsp;"id": 2,\
      &emsp;&emsp;"text": "2 question",\
      &emsp;&emsp;"createdAt": "2022-10-22T21:33:42.816Z",\
      &emsp;&emsp;"updatedAt": "2022-10-22T21:33:42.816Z",\
      &emsp;&emsp;"userId": 2\
      &emsp;},\
      ]
2. /question
   - отправление вопроса
   - метод POST
   - body:\
     {\
     &emsp;"text": STRING NOT NULL,\
     &emsp;"name": STRING NOT NULL,\
     &emsp;"email": STRING UNIQUE,\
     &emsp;"phone": STRING UNIQUE\
     }
   - должно быть заполнено либо поле email, либо phone (оба NULL нельзя)
   - возвращается объект:\
     {\
     &emsp;"id": 4,\
     &emsp;"userId": 3,\
     &emsp;"text": "test",\
     &emsp;"updatedAt": "2022-10-22T22:06:06.537Z",\
     &emsp;"createdAt": "2022-10-22T22:06:06.537Z"\
     }
   - также создается пользователь, если email или phone новые (роль по умолчанию ставится 1 - роль user, флаг is_reg ставится false, то есть не зарегестрированный пользователь)\
     если пользователь с таким email или phone уже есть, но имя другое, то имя пользователя меняется на новое

**Users:**

1. /user
   - получение списка всех пользователей
   - метод GET
   - возвращается массив объектов:\
     [\
     &emsp;{\
     &emsp;&emsp;"id": 2,\
     &emsp;&emsp;"name": "Anya",\
     &emsp;&emsp;"email": null,\
     &emsp;&emsp;"phone": "+71111111111",\
     &emsp;&emsp;"password": null,\
     &emsp;&emsp;"is_reg": false,\
     &emsp;&emsp;"createdAt": "2022-10-22T21:33:42.774Z",\
     &emsp;&emsp;"updatedAt": "2022-10-22T21:33:42.774Z",\
     &emsp;&emsp;"roleId": 1\
     &emsp;},\
     ]

**Roles:**

1. /role
   - получение списка всех ролей
   - метод GET
   - возвращается массив объектов:\
     [\
     &emsp;{\
     &emsp;&emsp;"id": 1,\
     &emsp;&emsp;"name": "user",\
     &emsp;&emsp;"createdAt": "2022-10-22T21:11:26.832Z",\
     &emsp;&emsp;"updatedAt": "2022-10-22T21:11:26.832Z"\
     &emsp;},\
     &emsp;{\
     &emsp;&emsp;"id": 10,\
     &emsp;&emsp;"name": "admin",\
     &emsp;&emsp;"createdAt": "2022-10-22T21:11:41.487Z",\
     &emsp;&emsp;"updatedAt": "2022-10-22T21:11:41.487Z"\
     &emsp;}\
     ]
2. /role
   - создание новой роли
   - метод POST
   - body:\
     {\
     &emsp;"id": INTEGER NOT NULL UNIQUE,\
     &emsp;"name": STRING NOT NULL UNIQUE,\
     }
   - возвращается объект:\
     {\
     &emsp;"id": 1,\
     &emsp;"name": "user",\
     &emsp;"createdAt": "2022-10-22T21:11:26.832Z",\
     &emsp;"updatedAt": "2022-10-22T21:11:26.832Z"\
     }
