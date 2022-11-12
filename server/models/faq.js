const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const Faq = sequelize.define(
  "Faq",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать title",
        },
      },
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать ответ",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: "Значение categoryId должно быть типа integer",
        },
      },
    },
  },
  {}
);

Faq.associate = (models) => {
  Faq.belongsTo(models.Category, {
    as: "category",
    foreignKey: "categoryId",
  });
};

module.exports = Faq;
