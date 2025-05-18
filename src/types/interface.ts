import { Model } from 'sequelize';

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    role: string;
    full_name: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: string;
    avatar_url?: string;
    is_active?: boolean;
    company_id?: number;
    position?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export interface CategoryAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CategoryInstance extends Model<CategoryAttributes>, CategoryAttributes {}

export interface CompanyAttributes {
    id?: number;
    owner_id: number;
    name: string;
    description: string;
    employeeCount: string;
    website: string;
    logo_url: string;
    location: string;
    verified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CompanyInstance extends Model<CompanyAttributes>, CompanyAttributes {}

export interface JobPostAttributes {
    id?: number;
    company_id: number;
    recruiter_id: number;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    job_type: string;
    required_skills: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface JobPostInstance extends Model<JobPostAttributes>, JobPostAttributes {}

export interface CvAttributes {
    id?: number;
    user_id: number;
    title: string;
    required_skills: string;
    file_url: string;
    is_active: boolean;
    is_shared: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CvInstance extends Model<CvAttributes>, CvAttributes {}

export interface ApplicationAttributes {
    id?: number;
    user_id: number;
    job_post_id: number;
    cv_id: number;
    status: string;
    submitted_at: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ApplicationInstance extends Model<ApplicationAttributes>, ApplicationAttributes {}

export interface SavedJobAttributes {
    id?: number;
    user_id: number;
    job_post_id: number;
    saved_at: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface SavedJobInstance extends Model<SavedJobAttributes>, SavedJobAttributes {}

export interface JobCategorieAttributes {
    id?: number;
    user_id: number;
    job_post_id: number;
    saved_at: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface JobCategorieInstance extends Model<JobCategorieAttributes>, JobCategorieAttributes {}
