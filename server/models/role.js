const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать номер роли",
        },
        isInt: {
          args: true,
          msg: "Номер роли (id) должно быть типа integer",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Необходимо указать название роли",
        },
      },
    },
  },
  {}
);

Role.associate = (models) => {
  Role.hasMany(models.User, {
    as: "roles",
    foreignKey: "roleId",
  });
};

module.exports = Role;
