**npm run dev - запуск сервера**

# Содержание

[[_TOC_]]

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

### Перед началом работы необходимо загрузить миграции и сиды с помощью следующих команд:

npx sequelize-cli db:migrate\
npx sequelize-cli db:seed:all\
\
Теперь в бд изначально будет:

- в таблице ролей будут 2 роли:
  - user с id = 1
  - admin c id = 10
- в таблице faq будут 4 вопроса с ответами:
  - не пришел билет
  - возврат билетов
  - процедура возврата
  - моего вопроса нет в списке

**Данный сид загружает дефолтные роли в таблицу ролей:**\
npx sequelize db:seed --seed 20221108102949-default-role.js

**Данный сид загружает дефолтные вопросы в таблицу faq:**\
npx sequelize db:seed --seed 20221110110357-default-faq.js

### API: http://localhost:5000/api

#### Questions:

1. /question
   - получение списка всех вопросов
   - метод GET
   - возвращается массив объектов:\
     [\
      &emsp;{\
      &emsp;&emsp;"id": 1,\
      &emsp;&emsp;"text": "first question",\
      &emsp;&emsp;"is_read": false,\
      &emsp;&emsp;"createdAt": "2022-10-22T21:18:14.002Z",\
      &emsp;&emsp;"updatedAt": "2022-10-22T21:18:14.002Z",\
      &emsp;&emsp;"fromId": 1,\
      &emsp;&emsp;"toId": null,\
      &emsp;&emsp;"categoryId": null\
      &emsp;},\
      &emsp;{\
      &emsp;&emsp;"id": 2,\
      &emsp;&emsp;"text": "2 question",\
      &emsp;&emsp;"is_read": false,\
      &emsp;&emsp;"createdAt": "2022-10-22T21:33:42.816Z",\
      &emsp;&emsp;"updatedAt": "2022-10-22T21:33:42.816Z",\
      &emsp;&emsp;"fromId": 2,\
      &emsp;&emsp;"toId": null,\
      &emsp;&emsp;"categoryId": null\
      &emsp;}\
      ]
   - вопросы в массиве возвращаются в порядке убвания по дате создания (сначала новые вопросы)
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
     &emsp;"is_read": false,\
     &emsp;"id": 4,\
     &emsp;"fromId": 3,\
     &emsp;"text": "test",\
     &emsp;"toId": null,\
     &emsp;"updatedAt": "2022-10-22T22:06:06.537Z",\
     &emsp;"createdAt": "2022-10-22T22:06:06.537Z",\
     &emsp;"categoryId": null\
     }
   - также создается пользователь, если email или phone новые (роль по умолчанию ставится 1 - роль user, флаг is_reg ставится false, то есть незарегестрированный пользователь)\
     если пользователь с таким email или phone уже есть, но имя другое, то имя пользователя меняется на новое
3. /question/:id
   - получение одного вопроса
   - метод GET
   - необходимо указать id вопроса
   - id должно быть INTEGER
   - при запросе меняется флаг вопроса is_read на true
   - возвращается объект:\
     {\
      &emsp;"is_read": true,\
      &emsp;"id": 4,\
      &emsp;"fromId": 3,\
      &emsp;"text": "test",\
      &emsp;"toId": null,\
      &emsp;"updatedAt": "2022-10-22T22:06:06.537Z",\
      &emsp;"createdAt": "2022-10-22T22:06:06.537Z",\
      &emsp;"categoryId": null\
      }
4. /question/readFlag
   - изменение флага is_read (прочитано) у вопроса(ов)
   - метод PUT
   - body:\
     {\
     &emsp;"questionId": ARRAY (INTEGER),\
     &emsp;"readFlag": BOOLEAN\
     }
   - в questionId необходимо передать массив со значениями id вопросов, у которых надо поменять статус "прочитано" (даже если сообщение одно)
   - в массиве questionId должны быть значения типа INTEGER
   - в readFlag указывается флаг, который установится на все вопросы, указанные в questionId (true - прочитан вопрос, false - вопрос непрочитан)
   - возвращается объект:\
     {\
     &emsp;"message": "Данные успешно обновлены"/ "Вопросов с таким(и) id нет, данные не обновлены",\
     &emsp;"status": "ok",\
     &emsp;"changedRow": 1\
     }
   - changedRow - количество измененных записей в базе данных
   - если changedRow == 0, то message будет "Вопросов с таким(и) id нет, данные не обновлены"
   - если хотя бы одно значение в questionId будет некорректным (не тот тип, или вопроса с таким id нет), то никакие данные не обновятся

#### Users:

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
     &emsp;}\
     ]

#### Roles:

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

#### FAQ:

1. /faq
   - получение списка всех вопросов и ответов в faq
   - метод GET
   - возвращается массив объектов:\
     [\
     &emsp;{\
     &emsp;&emsp;"id": 1,\
     &emsp;&emsp;"title": "Не пришел билет",\
     &emsp;&emsp;"answer": "Письмо с билетом может упасть в папку «спам». Рекомендуем проверить все дополнительные папки почты.",\
     &emsp;&emsp;"categoryId": null,\
     &emsp;&emsp;"createdAt": "2022-11-10T11:14:06.697Z",\
     &emsp;&emsp;"updatedAt": "2022-11-10T11:14:06.697Z"\
     &emsp;},\
     &emsp;{\
     &emsp;&emsp;"id": 2,\
     &emsp;&emsp;"title": "Возврат билетов",\
     &emsp;&emsp;"answer": "Согласно Постановлению Правительства Российской Федерации №830 от 6 июня 2020 г у организатора есть 180 дней с момента подачи вашей заявки на возврат для того, чтобы определиться с датой переноса, или сделать вам возврат. Обратите внимание на то, что если мероприятие было перенесено, организатор может отказать в возврате. Ваши билеты действительны на новую дату проведения ивента.",\
     &emsp;&emsp;"categoryId": null,\
     &emsp;&emsp;"createdAt": "2022-11-10T11:14:06.707Z",\
     &emsp;&emsp;"updatedAt": "2022-11-10T11:14:06.707Z"\
     &emsp;}\
     ]
