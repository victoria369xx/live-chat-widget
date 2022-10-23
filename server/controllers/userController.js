const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

class UserController {
  async registartion(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }

  // async logout(req, res) {}

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  // async get(req, res) {}

  // async delete(req, res) {}

  // async update(req, res) {}
}

module.exports = new UserController();
