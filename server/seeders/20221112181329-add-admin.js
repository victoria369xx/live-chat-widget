"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "admin",
        email: "admin@mail.ru",
        password:
          "$2a$05$bTRtkS7rIXZRvhqbpQ8rD.9KVjC98R9183RKWCKsBYnAiPoNzzhsW",
        is_reg: true,
        roleId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "Users",
      { name: "admin", email: "admin@mail.ru" },
      {}
    );
  },
};
