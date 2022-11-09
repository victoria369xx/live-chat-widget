// "use strict";
// const { Model } = require("sequelize");
// const Question = require("./models");
// const Role = require("./role");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.hasMany(Question, {
//         foreignKey: {
//           name: "fromId",
//         },
//       });
//       this.hasMany(Question, {
//         foreignKey: {
//           name: "toId",
//         },
//       });
//       this.belongsTo(Role);
//     }
//   }
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         defaultValue: "user",
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//       },
//       is_reg: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         defaultValue: "user",
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//       },
//       is_reg: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       roleId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {}
//   );

//   User.associate = (models) => {
//     User.hasMany(models.Question, {
//       as: "users",
//       foreignKey: "fromId",
//     });
//     User.hasMany(models.Question, {
//       as: "users",
//       foreignKey: "toId",
//     });
//     User.belongsTo(models.Role, {
//       as: "role",
//       foreignKey: "roleId",
//     });
//   };

//   return User;
// };

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
