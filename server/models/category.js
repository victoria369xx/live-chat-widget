// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Category.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Category',
//   });
//   return Category;
// };

// module.exports = (sequelize, DataTypes) => {
//   const Category = sequelize.define(
//     "Category",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     },
//     {}
//   );

//   Category.associate = (models) => {
//     Category.hasMany(models.Questions, {
//       as: "categories",
//       foreignKey: "categoryId",
//       allowNull: true,
//     });
//   };

//   return Category;
// };

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
  Category.hasMany(models.Questions, {
    as: "categories",
    foreignKey: "categoryId",
    allowNull: true,
  });
};

module.exports = Category;
