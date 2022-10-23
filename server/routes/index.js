const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const questionRouter = require("./questionRouter");
const roleRouter = require("./roleRouter");

router.use("/user", userRouter);
router.use("/question", questionRouter);
router.use("/role", roleRouter);

module.exports = router;
