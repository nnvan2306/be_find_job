import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';
import { Op } from 'sequelize';

export const jobPostController = {
    // Get all job posts
    // getAllJobPosts: async (req: Request, res: Response) => {
    //     try {
    //         const jobPosts = await db.JobPost.findAll({
    //             include: [
    //                 { model: db.Company, as: 'company' },
    //                 { model: db.User, as: 'recruiter' },
    //                 { model: db.Category, as: 'category' },
    //             ],
    //         });
    //         return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', jobPosts));
    //     } catch (error) {
    //         return res
    //             .status(HttpStatusCode.BadGateway)
    //             .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
    //     }
    // },

    getAllJobPosts: async (req: Request, res: Response) => {
        try {
            const { search, category_id } = req.query;

            const whereClause: any = {};

            if (search) {
                whereClause.required_skills = {
                    [Op.like]: `%${search}%`,
                };
            }

            if (category_id) {
                whereClause.category_id = category_id;
            }

            const jobPosts = await db.JobPost.findAll({
                where: whereClause,
                include: [
                    { model: db.Company, as: 'company' },
                    { model: db.User, as: 'recruiter' },
                    { model: db.Category, as: 'category' },
                ],
            });

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', jobPosts));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get job post by ID
    getJobPostById: async (req: Request, res: Response) => {
        try {
            const jobPost = await db.JobPost.findByPk(req.params.id, {
                include: [
                    { model: db.Company, as: 'company' },
                    { model: db.User, as: 'recruiter' },
                    { model: db.Category, as: 'category' },
                    { model: db.Application, as: 'applications' },
                ],
            });
            if (!jobPost) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Job post not found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', jobPost));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Create new job post
    createJobPost: async (req: Request, res: Response) => {
        try {
            const jobPost = await db.JobPost.create(req.body);
            if (req.body.categories) {
                await jobPost.setCategories(req.body.categories);
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', jobPost));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Update job post
    updateJobPost: async (req: Request, res: Response) => {
        try {
            const jobPost = await db.JobPost.findByPk(req.params.id);
            if (!jobPost) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Job post not found', null));
            }
            await jobPost.update(req.body);
            if (req.body.categories) {
                await jobPost.setCategories(req.body.categories);
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', jobPost));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Delete job post
    deleteJobPost: async (req: Request, res: Response) => {
        try {
            const jobPost = await db.JobPost.findByPk(req.params.id);
            if (!jobPost) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Job post not found', null));
            }
            await jobPost.destroy();
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Job post deleted successfully', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },
};
