import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

export const applicationController = {
    // Get all applications
    getAllApplications: async (req: Request, res: Response) => {
        try {
            const { user_id, company_id, recruiter_id } = req.query;

            const whereClause: any = {};

            if (user_id) {
                whereClause.user_id = user_id;
            }
            if (company_id) {
                whereClause.company_id = company_id;
            }
            if (recruiter_id) {
                whereClause.recruiter_id = recruiter_id;
            }

            const applications = await db.Application.findAll({
                where: whereClause,
                include: [
                    { model: db.User, as: 'user' },
                    { model: db.JobPost, as: 'jobPost' },
                    { model: db.CV, as: 'cv' },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', applications));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get application by ID
    getApplicationById: async (req: Request, res: Response) => {
        try {
            const application = await db.Application.findByPk(req.params.id, {
                include: [
                    { model: db.User, as: 'user' },
                    { model: db.JobPost, as: 'jobPost' },
                    { model: db.CV, as: 'cv' },
                ],
            });
            if (!application) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Application not found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', application));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Create new application
    createApplication: async (req: Request, res: Response) => {
        try {
            const application = await db.Application.create(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', application));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Update application
    updateApplication: async (req: Request, res: Response) => {
        try {
            const application = await db.Application.findByPk(req.params.id);
            if (!application) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Application not found', null));
            }
            await application.update(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', application));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Delete application
    deleteApplication: async (req: Request, res: Response) => {
        try {
            const application = await db.Application.findByPk(req.params.id);
            if (!application) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Application not found', null));
            }
            await application.destroy();
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Application deleted successfully', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get applications by user ID
    getApplicationsByUser: async (req: Request, res: Response) => {
        try {
            const applications = await db.Application.findAll({
                where: { user_id: req.params.userId },
                include: [
                    { model: db.User, as: 'user' },
                    { model: db.JobPost, as: 'jobPost' },
                    { model: db.CV, as: 'cv' },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', applications));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get applications by job post ID
    getApplicationsByJobPost: async (req: Request, res: Response) => {
        try {
            const applications = await db.Application.findAll({
                where: { job_post_id: req.params.jobPostId },
                include: [
                    { model: db.User, as: 'user' },
                    { model: db.JobPost, as: 'jobPost' },
                    { model: db.CV, as: 'cv' },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', applications));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },
};
