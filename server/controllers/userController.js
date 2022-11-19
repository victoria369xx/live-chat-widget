const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateJwt = (id, email, roleId) => {
  return jwt.sign({ id, email, roleId }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async create(req, res, next) {
    try {
      const { email, password, roleId } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email или пароль"));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(
            `Пользователь с таким email уже существует, его id = ${candidate.id}`
          )
        );
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email: email,
        roleId: roleId,
        password: hashPassword,
        is_reg: true,
      });

      return res.json({
        id: user.id,
        email: user.email,
        roleId: user.roleId,
        is_reg: user.is_reg,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateRoleAndAuth(req, res, next) {
    try {
      const { id, roleId, password } = req.body;

      if (!id || isNaN(id)) {
        return next(ApiError.badRequest("Некорректный id"));
      }
      if (!password) {
        return next(ApiError.badRequest("Необходимо ввести пароль"));
      }
      if (!roleId) {
        return next(ApiError.badRequest("Необходимо ввести roleId"));
      }

      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.internal("Пользователь не найден"));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const changedRow = await User.update(
        { roleId: roleId, password: hashPassword, is_reg: true },
        {
          where: {
            id: id,
          },
        }
      );

      if (changedRow[0] === 0) {
        return next(ApiError.internal("Данные пользователя не обновлены"));
      }

      const result = {
        message: "Данные успешно обновлены",
        status: "ok",
      };

      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return next(ApiError.internal("Пользователь не найден"));
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Указан неверный пароль"));
      }

      const token = generateJwt(user.id, user.email, user.roleId);
      const result = {
        token: token,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        is_reg: user.is_reg,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.roleId);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { roleId } = req.query;
      let users = [];
      if (!roleId) {
        users = await User.findAll();
      } else {
        users = await User.findAll({ where: { roleId } });
      }

      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return next(
          ApiError.badRequest("Некорректный запрос: id должно быть числом")
        );
      }

      const user = await User.findOne({
        where: { id: id },
      });

      if (!user) {
        return next(
          ApiError.badRequest("Нет такого пользователя в базе данных")
        );
      }

      await User.destroy({
        where: {
          id: id,
        },
        force: true,
      });

      const result = {
        message: "Пользователь удален",
        status: "ok",
      };
      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async logout(req, res, next) {
  //   try {
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  // async get(req, res, next) {}
  // async update(req, res, next) {}
}

module.exports = new UserController();
