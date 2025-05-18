import { DataTypes, Sequelize } from 'sequelize';
import { CVInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const CV = sequelize.define<CVInstance>(
        'CV',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
            },
            required_skills: {
                type: DataTypes.TEXT,
            },
            file_url: {
                type: DataTypes.STRING(255),
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            is_shared: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: false,
        },
    );

    return CV;
};
