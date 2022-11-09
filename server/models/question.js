// "use strict";
// const { Model } = require("sequelize");
// const User = require("./models");
// module.exports = (sequelize, DataTypes) => {
//   class Question extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.belongsTo(User);
//       // this.belongsTo(User);
//     }
//   }
//   Question.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       text: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       is_read: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Question",
//     }
//   );
//   return Question;
// };

// module.exports = (sequelize, DataTypes) => {
//   const Question = sequelize.define(
//     "Question",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       text: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       is_read: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       fromId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       toId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       categoryId: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//     },
//     {}
//   );

//   Question.associate = (models) => {
//     Question.belongsTo(models.User, {
//       as: "user",
//       foreignKey: "fromId",
//     });
//     Question.belongsTo(models.User, {
//       as: "user",
//       foreignKey: "toId",
//     });
//     Question.belongsTo(models.Category, {
//       as: "category",
//       foreignKey: "categoryId",
//     });
//   };

//   return Question;
// };

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
