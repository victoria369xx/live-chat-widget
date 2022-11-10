const Router = require("express");
const faqController = require("../controllers/faqController");
const router = new Router();

router.get("/", faqController.getAll);
//router.post("/", faqController.create) - создание вопроса в faq
//router.delete("/:id", faqController.delete) - удаление вопроса в faq
//router.put("/:id", faqController.update) - обновление вопроса в faq

module.exports = router;
