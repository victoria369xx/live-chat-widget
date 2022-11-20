const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать вопрос",
        },
      },
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          args: true,
          msg: "Значение is_read должно быть типа boolean",
        },
      },
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Значение fromId должно быть типа integer",
        },
      },
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: "Значение toId должно быть типа integer",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать categoryId",
        },
        isInt: {
          args: true,
          msg: "Значение categoryId должно быть типа integer",
        },
      },
    },
  },
  {}
);

Question.associate = (models) => {
  Question.belongsTo(models.User, {
    as: "user",
    foreignKey: "fromId",
  });
  Question.belongsTo(models.User, {
    as: "user",
    foreignKey: "toId",
  });
  Question.belongsTo(models.Category, {
    as: "category",
    foreignKey: "categoryId",
  });
};

module.exports = Question;
