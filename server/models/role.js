const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
