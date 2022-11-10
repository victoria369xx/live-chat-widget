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
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_reg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
