import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

class CVController {
    async getAllCVs(req: Request, res: Response) {
        try {
            const cvs = await db.CV.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'List CVs', cvs));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async getCVById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cv = await db.CV.findByPk(id, {
                include: [
                    {
                        model: db.User,
                        as: 'user',
                    },
                ],
            });
            if (!cv) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'CV Not Found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'CV Details', cv));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async createCV(req: Request, res: Response) {
        try {
            const cv = await db.CV.create(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Create CV Success', cv));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async updateCV(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cv = await db.CV.findByPk(id);
            if (!cv) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'CV Not Found', null));
            }
            await cv.update(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Update CV Success', cv));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async deleteCV(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cv = await db.CV.findByPk(id);
            if (!cv) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'CV Not Found', null));
            }
            await cv.destroy();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Delete CV Success', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new CVController();
