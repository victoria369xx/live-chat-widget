const ApiError = require("../error/ApiError");
const Faq = require("../models/faq");

class faqController {
  async getAll(req, res, next) {
    try {
      const faqs = await Faq.findAll();
      return res.json(faqs);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //async create(req, res, nex) {} (доступ должен быть только у админа (добавить проверку))

  // async delete(req, res) {} (доступ должен быть только у админа (добавить проверку))

  // async update(req, res) {} (доступ должен быть только у админа (добавить проверку))
}

module.exports = new faqController();
