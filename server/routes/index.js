const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const questionRouter = require("./questionRouter");
const roleRouter = require("./roleRouter");
const faqRouter = require("./faqRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/question", questionRouter);
router.use("/role", roleRouter);
router.use("/faq", faqRouter);
router.use("/category", categoryRouter);

module.exports = router;
