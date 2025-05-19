import { Model, Optional } from 'sequelize';

// User interfaces
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    role: 'admin' | 'applicant' | 'recruiter' | 'company';
    full_name?: string;
    phone?: string;
    address?: string;
    date_of_birth?: Date;
    gender?: 'male' | 'female' | 'other';
    avatar_url?: string;
    is_active: boolean;
    company_id?: number;
    position?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

// Company interfaces
interface CompanyAttributes {
    id: number;
    owner_id: number;
    name: string;
    description?: string;
    website?: string;
    logo_url?: string;
    location?: string;
    verified: boolean;
    createdAt?: Date;
    employeeCount: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

export interface CompanyInstance extends Model<CompanyAttributes, CompanyCreationAttributes>, CompanyAttributes {}

// JobPost interfaces
interface JobPostAttributes {
    id: number;
    company_id: number;
    recruiter_id: number;
    title: string;
    description?: string;
    location?: string;
    salary_range?: string;
    job_type?: string;
    category_id: number;
    required_skills?: string;
    status: 'active' | 'closed';
    createdAt?: Date;
}

interface JobPostCreationAttributes extends Optional<JobPostAttributes, 'id'> {}

export interface JobPostInstance extends Model<JobPostAttributes, JobPostCreationAttributes>, JobPostAttributes {
    setCategories: (categories: number[]) => Promise<void>;
}

// CV interfaces
interface CVAttributes {
    id: number;
    user_id: number;
    title?: string;
    required_skills?: string;
    file_url?: string;
    is_active: boolean;
    is_shared: boolean;
    createdAt?: Date;
}

interface CVCreationAttributes extends Optional<CVAttributes, 'id'> {}

export interface CVInstance extends Model<CVAttributes, CVCreationAttributes>, CVAttributes {}

// Application interfaces
interface ApplicationAttributes {
    id: number;
    user_id: number;
    job_post_id: number;
    cv_id: number;
    company_id: number;
    recruiter_id: number;
    status: 'pending' | 'accepted' | 'rejected';
    submitted_at?: Date;
}

interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id'> {}

export interface ApplicationInstance
    extends Model<ApplicationAttributes, ApplicationCreationAttributes>,
        ApplicationAttributes {}

// Report interfaces
interface ReportAttributes {
    id: number;
    user_id?: number;
    type?: 'application' | 'job_post' | 'company';
    content?: string;
    createdAt?: Date;
}

interface ReportCreationAttributes extends Optional<ReportAttributes, 'id'> {}

export interface ReportInstance extends Model<ReportAttributes, ReportCreationAttributes>, ReportAttributes {}

// SavedJob interfaces
interface SavedJobAttributes {
    user_id: number;
    job_post_id: number;
    saved_at?: Date;
}

interface SavedJobCreationAttributes extends SavedJobAttributes {}

export interface SavedJobInstance extends Model<SavedJobAttributes, SavedJobCreationAttributes>, SavedJobAttributes {}

// Category interfaces
interface CategoryAttributes {
    id: number;
    name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes {}

// JobCategory interfaces
interface JobCategoryAttributes {
    job_post_id: number;
    category_id: number;
}

interface JobCategoryCreationAttributes extends JobCategoryAttributes {}

export interface JobCategoryInstance
    extends Model<JobCategoryAttributes, JobCategoryCreationAttributes>,
        JobCategoryAttributes {}
