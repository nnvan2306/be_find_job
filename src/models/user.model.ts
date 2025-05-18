import { DataTypes, Sequelize } from 'sequelize';
import { UserInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        full_name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        date_of_birth: DataTypes.STRING,
        gender: DataTypes.STRING,
        avatar_url: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        company_id: DataTypes.NUMBER,
        position: DataTypes.STRING,
    });

    return User;
};
