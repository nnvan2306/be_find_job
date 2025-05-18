import { DataTypes, Sequelize } from 'sequelize';
import { UserInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('admin', 'applicant', 'recruiter', 'company'),
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING(255),
            },
            phone: {
                type: DataTypes.STRING(20),
            },
            address: {
                type: DataTypes.TEXT,
            },
            date_of_birth: {
                type: DataTypes.DATE,
            },
            gender: {
                type: DataTypes.ENUM('male', 'female', 'other'),
            },
            avatar_url: {
                type: DataTypes.STRING(255),
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            company_id: {
                type: DataTypes.INTEGER,
            },
            position: {
                type: DataTypes.STRING(100),
            },
        },
        {
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    );

    return User;
};
