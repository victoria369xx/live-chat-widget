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
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
