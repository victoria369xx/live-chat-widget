const jwt = require("jsonwebtoken");

module.exports = function () {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }
      const { id } = req.body;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (
        decoded.id !== id &&
        decoded.roleId !== Number(process.env.ADMIN_ID)
      ) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
