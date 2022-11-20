const ApiError = require("../error/ApiError");
const Category = require("../models/category");

class categoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new categoryController();
