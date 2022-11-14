const Router = require("express");
const router = new Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", questionController.create);
router.get("/", authMiddleware, questionController.getAll);
router.get("/:id", authMiddleware, questionController.getOne);
router.put("/readFlag", authMiddleware, questionController.updateReadFlag);
//router.delete("/:id", questionController.delete) - удаление вопроса
//router.put("/:id", questionController.update) - обновление вопроса

module.exports = router;
