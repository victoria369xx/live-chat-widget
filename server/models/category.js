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
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать название категории",
        },
      },
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
  Category.hasMany(models.User, {
    as: "categories",
    foreignKey: "categoryId",
    allowNull: true,
  });
};

module.exports = Category;
