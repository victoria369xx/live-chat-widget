const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleare");

router.post("/login", userController.login);
//генерация нового токена (если пользователь будет постоянно использовать свой аккаунт, токен будет перезаписываться)
router.get("/auth", authMiddleware, userController.check);
//админ получает список всех пользователей (roleId == 10)
router.get("/", authMiddleware, checkRole(10), userController.getAll);
//админ создает оператора из нового пользователя(новый email, новый пароль) (roleId == 10)
router.post("/", authMiddleware, checkRole(10), userController.create);
//админ делает оператора из существующего пользователя(старый email, новый пароль) (roleId == 10)
router.put(
  "/updateRoleAndAuth",
  authMiddleware,
  checkRole(10),
  userController.updateRoleAndAuth
);
//админ удаляет пользователя (roleId == 10)
router.delete("/:id", authMiddleware, checkRole(10), userController.delete);

//router.get("/:id", userController.get); - получение одного пользователя
//router.get("/logout", userController.logout) - выход пользователя
//router.put() - обновление пользователя

module.exports = router;
