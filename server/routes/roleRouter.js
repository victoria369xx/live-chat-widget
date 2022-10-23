const Router = require("express");
const router = new Router();
const roleController = require("../controllers/roleController");

router.post("/", roleController.create);
router.get("/", roleController.getAll);
// router.get("/:id", roleController.get); - получение одной роли
//router.delete("/:id", roleController.delete) - удаление роли
//router.put("/:id", roleController.update) - обновление роли

module.exports = router;
