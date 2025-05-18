import { DataTypes, Sequelize } from 'sequelize';
import { ApplicationInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Application = sequelize.define<ApplicationInstance>(
        'Application',
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
            job_post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cv_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
                defaultValue: 'pending',
            },
        },
        {
            timestamps: true,
            createdAt: 'submitted_at',
            updatedAt: false,
        },
    );

    return Application;
};
