import { DataTypes, Sequelize } from 'sequelize';
import { JobCategoryInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const JobCategory = sequelize.define<JobCategoryInstance>('JobCategory', {
        job_post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    });

    return JobCategory;
};
