import { DataTypes, Sequelize } from 'sequelize';
import { ReportInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Report = sequelize.define<ReportInstance>(
        'Report',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            type: {
                type: DataTypes.ENUM('application', 'job_post', 'company'),
            },
            content: {
                type: DataTypes.TEXT,
            },
        },
        {
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: false,
        },
    );

    return Report;
};
