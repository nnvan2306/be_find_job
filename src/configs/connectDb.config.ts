import db from '~/models';

export const startAndConnectDB = async () => {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('App ConnectDB Successfully');
};
