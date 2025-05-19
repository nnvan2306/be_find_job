import { Sequelize } from 'sequelize';
import ApplicationModel from './application.model';
import CategoryModel from './category.model';
import CompanyModel from './company.model';
import CVModel from './cv.model';
import JobCategoryModel from './job_category.model';
import JobPostModel from './job_post.model';
import ReportModel from './report.model';
import SavedJobModel from './saved_job.model';
import UserModel from './user.model';

export default (sequelize: Sequelize) => {
    const User = UserModel(sequelize);
    const Company = CompanyModel(sequelize);
    const JobPost = JobPostModel(sequelize);
    const CV = CVModel(sequelize);
    const Application = ApplicationModel(sequelize);
    const Report = ReportModel(sequelize);
    const SavedJob = SavedJobModel(sequelize);
    const Category = CategoryModel(sequelize);
    const JobCategory = JobCategoryModel(sequelize);

    // User associations
    User.hasMany(Company, { foreignKey: 'owner_id', as: 'ownedCompanies' });
    User.hasMany(JobPost, { foreignKey: 'recruiter_id', as: 'postedJobs' });
    User.hasMany(CV, { foreignKey: 'user_id', as: 'cvs' });
    User.hasMany(Application, { foreignKey: 'user_id', as: 'applications' });
    User.hasMany(Report, { foreignKey: 'user_id', as: 'reports' });
    User.belongsToMany(JobPost, { through: SavedJob, foreignKey: 'user_id', as: 'savedJobs' });

    // Company associations
    Company.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
    Company.hasMany(JobPost, { foreignKey: 'company_id', as: 'jobPosts' });
    Company.hasMany(User, { foreignKey: 'company_id', as: 'employees' });

    // JobPost associations
    JobPost.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    JobPost.belongsTo(User, { foreignKey: 'recruiter_id', as: 'recruiter' });
    JobPost.hasMany(Application, { foreignKey: 'job_post_id', as: 'applications' });
    JobPost.belongsToMany(User, { through: SavedJob, foreignKey: 'job_post_id', as: 'savedByUsers' });
    // JobPost.belongsToMany(Category, { through: JobCategory, foreignKey: 'job_post_id', as: 'categories' });
    // JobPost.belongsTo(Category, { foreignKey: 'category_id', as: 'jobPosts' });
    JobPost.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

    // CV associations
    CV.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    CV.hasMany(Application, { foreignKey: 'cv_id', as: 'applications' });

    // Application associations
    Application.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Application.belongsTo(JobPost, { foreignKey: 'job_post_id', as: 'jobPost' });
    Application.belongsTo(CV, { foreignKey: 'cv_id', as: 'cv' });

    // Report associations
    Report.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    // Category associations
    // Category.belongsToMany(JobPost, { through: JobCategory, foreignKey: 'category_id', as: 'jobPosts' });
    // Category.hasMany(JobPost, { foreignKey: 'category_id', as: 'category' });
    Category.hasMany(JobPost, { foreignKey: 'category_id', as: 'jobPosts' });

    return {
        User,
        Company,
        JobPost,
        CV,
        Application,
        Report,
        SavedJob,
        Category,
        JobCategory,
    };
};
