const ApiError = require("../error/ApiError");
const Role = require("../models/role");

class roleController {
  async create(req, res, next) {
    try {
      //доступ должен быть только у админа (добавить проверку)
      const { id, name } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Необходимо указать имя роли"));
      }

      if (!id) {
        return next(ApiError.badRequest("Необходимо указать номер роли"));
      }

      const role = await Role.create({ id: id, name: name });
      return res.json(role);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      //доступ должен быть только у админа (добавить проверку)
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
