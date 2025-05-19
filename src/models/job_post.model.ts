import { DataTypes, Sequelize } from 'sequelize';
import { JobPostInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const JobPost = sequelize.define<JobPostInstance>(
        'JobPost',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recruiter_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            location: {
                type: DataTypes.STRING(255),
            },
            salary_range: {
                type: DataTypes.STRING(100),
            },
            job_type: {
                type: DataTypes.STRING(100),
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            required_skills: {
                type: DataTypes.TEXT,
            },
            status: {
                type: DataTypes.ENUM('active', 'closed'),
                defaultValue: 'active',
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

    return JobPost;
};
