const ApiError = require("../error/ApiError");
const { sequelize } = require("../models");
const Question = require("../models/question");
const Role = require("../models/role");
const User = require("../models/user");
// const { User, Question } = require("../models/models");

class questionController {
  async create(req, res, next) {
    try {
      const { text, name, email, phone, toId } = req.body;

      if (!name) {
        // throw new Error("Необходимо указать имя");
        return next(ApiError.badRequest("Необходимо указать имя"));
      }

      if (!text) {
        return next(ApiError.badRequest("Необходимо указать вопрос"));
      }

      if (!email && !phone) {
        return next(
          ApiError.badRequest("Необходимо оставить контактные данные")
        );
      }

      const contactColumn = email ? "email" : "phone";
      const contact = email ? email : phone;

      const role = await Role.findOne({
        where: { name: "user" },
      });

      let [user, created] = await User.findOrCreate({
        where: { [contactColumn]: contact },
        defaults: {
          roleId: role.id,
          name: name,
        },
      });

      if (user.name !== name) {
        user.set({ name: name });
        await user.save();
      }

      const question = await Question.create({
        fromId: user.id,
        text: text,
        toId: toId ? toId : null,
      });

      return res.json(question);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      //доступ должен быть только у админа (добавить проверку)
      const questions = await Question.findAll();
      return res.json(questions);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    //доступ должен быть только у админа (добавить проверку)
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return next(
          ApiError.badRequest("Некорректный запрос: id должно быть числом")
        );
      }

      await Question.update(
        { is_read: true },
        {
          where: {
            id: id,
          },
        }
      );

      const question = await Question.findOne({
        where: { id: id },
      });

      return res.json(question);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateReadFlag(req, res, next) {
    //доступ должен быть только у админа (добавить проверку)
    const t = await sequelize.transaction();
    try {
      const { questionId, readFlag } = req.body;

      if (!questionId || questionId.length === 0) {
        return next(
          ApiError.badRequest(
            "Необходимо передать id вопроса(ов), у которых будет меняться флаг"
          )
        );
      }

      //question должен быть массивом
      if (!Array.isArray(questionId)) {
        return next(
          ApiError.badRequest(
            "Некорректный запрос: question должен быть массивом"
          )
        );
      }

      if (typeof readFlag === "undefined") {
        return next(
          ApiError.badRequest("Необходимо передать новый флаг вопроса(ов)")
        );
      }

      const changedRow = await Question.update(
        { is_read: readFlag },
        {
          where: {
            id: questionId,
          },
          transaction: t,
        }
      );

      if (changedRow[0] !== questionId.length) {
        await t.rollback();
        return next(
          ApiError.badRequest(
            "Не все значения в questionId были корректны, данные не обновлены"
          )
        );
      }

      await t.commit();
      const result = {
        message:
          changedRow[0] === 0
            ? "Вопросов с таким(и) id нет, данные не обновлены"
            : "Данные успешно обновлены",
        status: "ok",
        changedRow: changedRow[0],
      };

      return res.json(result);
    } catch (e) {
      await t.rollback();
      next(ApiError.badRequest(e.message));
    }
  }
}

// async delete(req, res) {} (доступ должен быть только у админа (добавить проверку))

// async update(req, res) {} администратор может менять toId (тогда флаг is_read автоматически должен меняться на false), categoryId, is_read (доступ должен быть только у админа (добавить проверку))

module.exports = new questionController();
