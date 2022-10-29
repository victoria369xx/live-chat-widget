const ApiError = require("../error/ApiError");
const { User, Question } = require("../models/models");

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

      let [user, created] = await User.findOrCreate({
        where: { [contactColumn]: contact },
        defaults: {
          roleId: 1,
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
      const questions = await Question.findAll();
      return res.json(questions);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res) {}

  // async delete(req, res) {}
}

module.exports = new questionController();
