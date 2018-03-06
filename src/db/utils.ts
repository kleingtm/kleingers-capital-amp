import Sequelize from "sequelize";
import path from 'path';

class DbUtils {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB, // from .env - not checked in.
            process.env.DB_USER, // from .env - not checked in.
            process.env.DB_PWD, // from .env - not checked in.
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            });
    }

    uuid() {
        return {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`uuid_generate_v4()`),
            primaryKey: true,
            allowNull: false
        }
    }

    connect() {
        return this.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(()=>{
            return this.sequelize;
        })
    }
}

export let DB_UTILS = new DbUtils();
