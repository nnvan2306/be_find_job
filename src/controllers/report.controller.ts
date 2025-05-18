import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

class ReportController {
    async getAllReports(req: Request, res: Response) {
        try {
            const reports = await db.Report.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'List Reports', reports));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async getReportById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const report = await db.Report.findByPk(id, {
                include: [
                    {
                        model: db.User,
                        as: 'user',
                    },
                ],
            });
            if (!report) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'Report Not Found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Report Details', report));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async createReport(req: Request, res: Response) {
        try {
            const report = await db.Report.create(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Create Report Success', report));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async updateReport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const report = await db.Report.findByPk(id);
            if (!report) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'Report Not Found', null));
            }
            await report.update(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Update Report Success', report));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async deleteReport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const report = await db.Report.findByPk(id);
            if (!report) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'Report Not Found', null));
            }
            await report.destroy();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Delete Report Success', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new ReportController();
