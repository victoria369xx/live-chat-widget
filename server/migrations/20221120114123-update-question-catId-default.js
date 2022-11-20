"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'UPDATE public."Questions" SET "categoryId" = 1 WHERE id > 0'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'UPDATE public."Questions" SET "categoryId" = null WHERE id > 0'
    );
  },
};
