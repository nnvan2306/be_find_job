import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

class JobCategoryController {
    async getAllJobCategories(req: Request, res: Response) {
        try {
            const jobCategories = await db.JobCategory.findAll({
                include: [
                    {
                        model: db.JobPost,
                        as: 'jobPost',
                    },
                    {
                        model: db.Category,
                        as: 'category',
                    },
                ],
            });
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'List Job Categories', jobCategories));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async getJobCategoriesByJobId(req: Request, res: Response) {
        try {
            const { jobId } = req.params;
            const jobCategories = await db.JobCategory.findAll({
                where: { job_post_id: jobId },
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Job Categories', jobCategories));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async addCategoryToJob(req: Request, res: Response) {
        try {
            const { job_post_id, category_id } = req.body;
            const jobCategory = await db.JobCategory.create({
                job_post_id,
                category_id,
            });
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Add Category to Job Success', jobCategory));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async removeCategoryFromJob(req: Request, res: Response) {
        try {
            const { job_post_id, category_id } = req.params;
            const jobCategory = await db.JobCategory.findOne({
                where: {
                    job_post_id,
                    category_id,
                },
            });
            if (!jobCategory) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'Job Category Not Found', null));
            }
            await jobCategory.destroy();
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Remove Category from Job Success', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new JobCategoryController();
