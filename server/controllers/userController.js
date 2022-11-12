const ApiError = require("../error/ApiError");
const User = require("../models/user");

class UserController {
  async registartion(req, res) {
    //при регистрации необходимо добавлять роль = user
  }

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }

  // async logout(req, res) {}

  async getAll(req, res, next) {
    //доступ должен быть только у админа (добавить проверку)
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async get(req, res) {}

  // async delete(req, res) {}

  // async update(req, res) {}
}

module.exports = new UserController();
