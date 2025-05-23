import { DataTypes, Sequelize } from 'sequelize';
import { CompanyInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Company = sequelize.define<CompanyInstance>(
        'Company',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            owner_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            website: {
                type: DataTypes.STRING(255),
            },
            logo_url: {
                type: DataTypes.STRING(255),
            },
            location: {
                type: DataTypes.STRING(255),
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            employeeCount: {
                type: DataTypes.STRING(255),
            },
        },
        {
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: false,
        },
    );

    return Company;
};
