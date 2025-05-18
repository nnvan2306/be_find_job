import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

class SavedJobController {
    async getAllSavedJobs(req: Request, res: Response) {
        try {
            const savedJobs = await db.SavedJob.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                    },
                    {
                        model: db.JobPost,
                        as: 'jobPost',
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'List Saved Jobs', savedJobs));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async getSavedJobByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const savedJobs = await db.SavedJob.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: db.JobPost,
                        as: 'jobPost',
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'User Saved Jobs', savedJobs));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async saveJob(req: Request, res: Response) {
        try {
            const { user_id, job_post_id } = req.body;
            const savedJob = await db.SavedJob.create({
                user_id,
                job_post_id,
                saved_at: new Date(),
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Save Job Success', savedJob));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async unsaveJob(req: Request, res: Response) {
        try {
            const { user_id, job_post_id } = req.params;
            const savedJob = await db.SavedJob.findOne({
                where: {
                    user_id,
                    job_post_id,
                },
            });
            if (!savedJob) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'Saved Job Not Found', null));
            }
            await savedJob.destroy();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Unsave Job Success', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new SavedJobController();
