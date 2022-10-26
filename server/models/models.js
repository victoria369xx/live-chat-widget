const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "user" },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  is_reg: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Question = sequelize.define("question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT, allowNull: false },
});

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

User.hasMany(Question, {
  foreignKey: {
    name: "fromId",
  },
});
Question.belongsTo(User);

User.hasMany(Question, {
  foreignKey: {
    name: "toId",
    allowNull: true,
  },
});
Question.belongsTo(User);

Role.hasMany(User, {
  foreignKey: {
    defaultValue: 1,
  },
});
User.belongsTo(Role);

module.exports = {
  User,
  Question,
  Role,
};
