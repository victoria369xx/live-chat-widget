const Router = require("express");
const router = new Router();
const questionController = require("../controllers/questionController");

router.post("/", questionController.create);
router.get("/", questionController.getAll);
router.get("/:id", questionController.get);
//router.delete("/:id", questionController.delete) - удаление вопросов

module.exports = router;
