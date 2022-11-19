const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleare");

router.post("/login", userController.login);
//генерация нового токена (если пользователь будет постоянно использовать свой аккаунт, токен будет перезаписываться)
router.get("/auth", authMiddleware, userController.check);
//админ получает список всех пользователей
router.get(
  "/",
  authMiddleware,
  checkRole(process.env.ADMIN_ID),
  userController.getAll
);
//админ создает оператора из нового пользователя(новый email, новый пароль)
router.post(
  "/",
  authMiddleware,
  checkRole(process.env.ADMIN_ID),
  userController.create
);
//админ делает оператора из существующего пользователя(старый email, новый пароль)
router.put(
  "/updateRoleAndAuth",
  authMiddleware,
  checkRole(process.env.ADMIN_ID),
  userController.updateRoleAndAuth
);
//админ удаляет пользователя
router.delete(
  "/:id",
  authMiddleware,
  checkRole(process.env.ADMIN_ID),
  userController.delete
);

//router.get("/:id", userController.get); - получение одного пользователя
//router.get("/logout", userController.logout) - выход пользователя
//router.put() - обновление пользователя

module.exports = router;
