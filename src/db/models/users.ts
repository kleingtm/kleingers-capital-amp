const Sequelize = require('sequelize');
import { DB_UTILS } from '../utils';

// format -> define(<table name>, <schema>)
export default {
    _id: DB_UTILS.uuid(),
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    password: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal(`uuid_generate_v4()`),
        allowNull: false
    }
    ,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    phone: Sequelize.STRING,
    createdAt
        :
        {
            type: Sequelize.DATE
        }
    ,
    updatedAt: {
        type: Sequelize.DATE
    }
}