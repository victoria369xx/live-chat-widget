const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registartion);
router.post("/login", userController.login);
router.get("/auth", userController.check);
router.get("/", userController.getAll);
//router.get("/:id", userController.get); - получение одного пользователя
//router.get("/logout", userController.logout) - выход пользователя
//router.delete() - удаление пользователя
//router.put() - обновление пользователя

module.exports = router;
