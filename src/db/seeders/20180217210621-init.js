'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
          {
              firstname: "Tom",
              lastname: "Kleingers",
              email: "tom@evanstonavenue.com",
              address: "6929 W. Cleveland Street",
              city: "Niles",
              state: "IL",
              zip: "60714",
              phone: "(513)-292-4735",
          },
          {
              firstname: "Matt",
              lastname: "Kleingers",
              email: "kleingmr@gmail.com",
              address: "5226 Leatherwood Drive",
              city: "West Chester",
              state: "OH",
              zip: "45069",
              phone: "(513)-748-7062",
          },
          {
              firstname: "Joey",
              lastname: "Kleingers",
              email: "joey.kleingers@gmail.com",
              address: "10501 Landing Way, Apt. 453\n",
              city: "Miamisburg",
              state: "OH",
              zip: "45342",
              phone: "(513)-435-4011",
          }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
