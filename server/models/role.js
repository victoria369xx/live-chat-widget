// "use strict";
// const { Model } = require("sequelize");
// const User = require("./user");
// module.exports = (sequelize, DataTypes) => {
//   class Role extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.hasMany(User);
//     }
//   }
//   Role.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Role",
//     }
//   );
//   return Role;
// };

// module.exports = (sequelize, DataTypes) => {
//   const Role = sequelize.define(
//     "Role",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     },
//     {}
//   );

//   Role.associate = (models) => {
//     Role.hasMany(models.User, {
//       as: "roles",
//       foreignKey: "roleId",
//     });
//   };

//   return Role;
// };

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
