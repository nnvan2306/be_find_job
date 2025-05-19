import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';
import { Op } from 'sequelize';

class CVController {
    async getAllCVs(req: Request, res: Response) {
        try {
            const { search, user_id } = req.query;

            const whereClause: any = {};

            if (search) {
                whereClause.required_skills = {
                    [Op.like]: `%${search}%`,
                };
            }

            if (user_id) {
                whereClause.user_id = user_id;
            }
            const cvs = await db.CV.findAll({
                where: whereClause,
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

    async setMain(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idCv } = req.body;

            await db.CV.update({ is_active: false, is_shared: false }, { where: { user_id: id } });

            const cv = await db.CV.findByPk(idCv);

            if (!cv || cv.user_id != id) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'CV Not Found or Invalid', null));
            }

            cv.is_active = true;
            cv.is_shared = true;
            await cv.save();

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Set main CV success', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async setShare(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userCVs = await db.CV.findAll({ where: { user_id: id } });

            if (!userCVs || userCVs.length === 0) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'No CVs found for this user', null));
            }

            const sharedCV = userCVs.find((cv) => cv.is_shared === true);

            if (sharedCV) {
                sharedCV.is_shared = false;
                await sharedCV.save();
            } else {
                const activeCV = userCVs.find((cv) => cv.is_active === true);

                if (!activeCV) {
                    return res
                        .status(HttpStatusCode.NotFound)
                        .json(sendResponse(HttpStatusCode.NotFound, 'No active CV found', null));
                }

                activeCV.is_shared = true;
                await activeCV.save();
            }

            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Share CV status updated successfully', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new CVController();
