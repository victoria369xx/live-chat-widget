const ApiError = require("../error/ApiError");
const Role = require("../models/role");

class roleController {
  async create(req, res, next) {
    try {
      const { id, name } = req.body;

      const role = await Role.create({ id: id, name: name });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const roles = await Role.findAll();
      return res.json(roles);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async get(req, res) {} доступ должен быть только у админа (добавить проверку)

  // async delete(req, res) {} доступ должен быть только у админа (добавить проверку)

  // async update(req, res) {} доступ должен быть только у админа (добавить проверку)
}

module.exports = new roleController();
