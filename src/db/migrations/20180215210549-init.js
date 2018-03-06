'use strict';
require("babel-register")(); // you have to register with babel for migrations to use ES6 code

const Promise = require("bluebird");
const _ = require("lodash");
// const Models = require("../models/index.models");
const UserModel = require("../models/users");

console.log(`UserModel: ${JSON.stringify(UserModel)}`);

module.exports = {
  up: (queryInterface, Sequelize) => {


      /* Enable defaultValue: Sequelize.literal('uuid_generate_v4()') */
      queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

      /* Create tables: */
      // queryInterface.createTable(Models.funds.tableName, Models.funds.attributes, engine_char_schema());
      queryInterface.createTable('users', UserModel);

      /* Create relational tables: */
      // queryInterface.createTable(Models.user_to_fund.tableName, Models.user_to_fund.attributes, engine_char_schema());
      // queryInterface.createTable(Models.user_to_holding.tableName, Models.user_to_holding.attributes, engine_char_schema());



      // return Promise.map(UserModel.data, user => { // loop users in fund
      //     return UserModel.create(user.data) // create user
      //     .then(createdUser => {
      //         console.log('Created user: ' + JSON.stringify(createdUser));
      //     })
      // });

      // return Promise.map(SeedData.funds, fund => { // loop funds
      //     return Models.funds.create(fund.data) // create fund
      //     .then(createdFund => {
      //         return Promise.map(fund.users, user => { // loop users in fund
      //             return UserModel.create(user.data) // create user
      //             .then(createdUser => {
      //                 return Models.user_to_fund.create({ // create user to fund relationship
      //                     fund_id: createdFund.fund_id,
      //                     user_id: createdUser.user_id
      //                 })
      //             })
      //         });
      //     })
      // });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      return queryInterface.dropTable('users');
  }
};
