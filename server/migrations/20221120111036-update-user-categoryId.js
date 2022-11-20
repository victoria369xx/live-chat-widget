"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "Users",
        "categoryId",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Categories",
            key: "id",
          },
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("Users", "categoryId", { transaction });
    });
  },
};
