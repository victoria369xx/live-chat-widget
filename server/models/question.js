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
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
