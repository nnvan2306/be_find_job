import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';
import { Op } from 'sequelize';

export const companyController = {
    // Get all companies
    getAllCompanies: async (req: Request, res: Response) => {
        try {
            const { search } = req.query;

            const whereClause: any = {};

            if (search) {
                whereClause.name = {
                    [Op.like]: `%${search}%`,
                };
            }
            const companies = await db.Company.findAll({
                where: whereClause,
                include: [{ model: db.User, as: 'owner' }],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', companies));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get company by ID
    getCompanyById: async (req: Request, res: Response) => {
        try {
            const company = await db.Company.findByPk(req.params.id, {
                include: [
                    { model: db.User, as: 'owner' },
                    { model: db.JobPost, as: 'jobPosts' },
                ],
            });
            if (!company) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Company not found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', company));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Create new company
    createCompany: async (req: Request, res: Response) => {
        try {
            const company = await db.Company.create(req.body);
            await db.User.update({ company_id: company.id }, { where: { id: req.body.owner_id } });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', company));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Update company
    updateCompany: async (req: Request, res: Response) => {
        try {
            const company = await db.Company.findByPk(req.params.id);
            if (!company) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Company not found', null));
            }
            await company.update(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', company));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Delete company
    deleteCompany: async (req: Request, res: Response) => {
        try {
            const company = await db.Company.findByPk(req.params.id);
            if (!company) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Company not found', null));
            }
            await company.destroy();
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Company deleted successfully', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },
};
