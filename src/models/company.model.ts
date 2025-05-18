import { DataTypes, Sequelize } from 'sequelize';
import { CompanyInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Company = sequelize.define<CompanyInstance>('Company', {
        owner_id: DataTypes.NUMBER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        employeeCount: DataTypes.STRING,
        website: DataTypes.STRING,
        logo_url: DataTypes.STRING,
        location: DataTypes.STRING,
        verified: DataTypes.BOOLEAN,
    });

    return Company;
};
