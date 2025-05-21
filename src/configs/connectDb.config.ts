import { Sequelize } from 'sequelize';
import initModels from '~/models';
import dbConfig from './db.config';

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USER_NAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
});

const db = initModels(sequelize);

export const startAndConnectDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('App ConnectDB Successfully');
};

export default db;
