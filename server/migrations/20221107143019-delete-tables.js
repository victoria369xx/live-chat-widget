"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("questions");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("roles");
  },
};
