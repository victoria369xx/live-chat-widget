const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const questionRouter = require("./questionRouter");
const roleRouter = require("./roleRouter");
const faqRouter = require("./faqRouter");

router.use("/user", userRouter);
router.use("/question", questionRouter);
router.use("/role", roleRouter);
router.use("/faq", faqRouter);

module.exports = router;
