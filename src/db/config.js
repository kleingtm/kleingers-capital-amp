require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB,
        host: 'localhost',
        dialect: 'postgres'
    },
};