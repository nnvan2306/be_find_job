import 'dotenv/config';
import { Dialect } from 'sequelize';

export default {
    HOST: process.env.HOST || '127.0.0.1',
    DB_NAME: process.env.DB_NAME || '...',
    USER_NAME: process.env.USER_NAME || 'root',
    PASSWORD: process.env.PASSWORD || '',
    DIALECT: process.env.DIALECT || 'mysql',
} as {
    HOST: string;
    DB_NAME: string;
    USER_NAME: string;
    PASSWORD: string;
    DIALECT: Dialect;
};
