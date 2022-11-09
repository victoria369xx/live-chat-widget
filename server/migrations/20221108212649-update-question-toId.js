"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "Questions",
        "toId",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "Questions",
        "toId",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );
    });
  },
};
