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
    await queryInterface.bulkInsert("Faqs", [
      {
        title: "Не пришел билет",
        answer:
          "Письмо с билетом может упасть в папку «спам». Рекомендуем проверить все дополнительные папки почты.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Faqs", [
      {
        title: "Возврат билетов",
        answer:
          "Согласно Постановлению Правительства Российской Федерации №830 от 6 июня 2020 г у организатора есть 180 дней с момента подачи вашей заявки на возврат для того, чтобы определиться с датой переноса, или сделать вам возврат. Обратите внимание на то, что если мероприятие было перенесено, организатор может отказать в возврате. Ваши билеты действительны на новую дату проведения ивента.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Faqs", [
      {
        title: "Процедура возврата",
        answer:
          "После согласования заявки с организатором, дальнейшая обработка возврата займет от 1 до 3 дней. Сроки могут быть увеличены при отмене мероприятия и при повышенной загрузке сервиса. Вслед за проведением возврата на почту придёт чек, подтверждающий возврат. Деньги поступят не сразу. Срок их зачисления на счет зависит от вашего банка. Обычно это занимает не более 14-и дней.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Faqs", [
      {
        title: "Моего вопроса нет в списке",
        answer:
          "Если вашего вопроса нет в списке, вы можете задать его онлайн-консультанту, нажав на иконку чата.",
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
    await queryInterface.bulkDelete("Faqs", null, {});
  },
};
