const Router = require("express");
const router = new Router();
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleare");

//создать новую роль может только администратор
router.post(
  "/",
  authMiddleware,
  checkRole(process.env.ADMIN_ID),
  roleController.create
);
router.get("/", authMiddleware, roleController.getAll);
// router.get("/:id", roleController.get); - получение одной роли
//router.delete("/:id", roleController.delete) - удаление роли
//router.put("/:id", roleController.update) - обновление роли

module.exports = router;
