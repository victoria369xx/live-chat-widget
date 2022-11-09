const Router = require("express");
const router = new Router();
const questionController = require("../controllers/questionController");

router.post("/", questionController.create);
router.get("/", questionController.getAll);
router.get("/:id", questionController.getOne);
router.put("/readFlag", questionController.updateReadFlag);
//router.delete("/:id", questionController.delete) - удаление вопроса
//router.put("/:id", questionController.update) - обновление вопроса

module.exports = router;
