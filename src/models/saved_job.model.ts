import { DataTypes, Sequelize } from 'sequelize';
import { SavedJobInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const SavedJob = sequelize.define<SavedJobInstance>(
        'SavedJob',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            job_post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            saved_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            createdAt: 'saved_at',
            updatedAt: false,
        },
    );

    return SavedJob;
};
