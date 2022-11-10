const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {}
);

Category.associate = (models) => {
  Category.hasMany(models.Question, {
    as: "categories",
    foreignKey: "categoryId",
    allowNull: true,
  });
  Category.hasMany(models.Faq, {
    as: "categories",
    foreignKey: "categoryId",
    allowNull: true,
  });
};

module.exports = Category;
