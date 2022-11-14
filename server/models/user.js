const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать имя",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Некорректная почта",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isMobilePhone: {
          args: true,
          msg: "Некорректный номер телефона",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [[6, 20]],
          msg: "Количество символов в пароле должно быть >=6 и <=20",
        },
      },
    },
    is_reg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          args: true,
          msg: "Значение is_reg должно быть типа boolean",
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Значение roleId должно быть типа integer",
        },
      },
    },
  },
  {}
);

User.associate = (models) => {
  User.hasMany(models.Question, {
    as: "users",
    foreignKey: "fromId",
  });
  User.hasMany(models.Question, {
    as: "users",
    foreignKey: "toId",
  });
  User.belongsTo(models.Role, {
    as: "role",
    foreignKey: "roleId",
  });
};

module.exports = User;
