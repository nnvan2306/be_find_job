import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import sendResponse from '~/helpers/response';

export const userController = {
    // Get all users
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await db.User.findAll();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', users));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get users by company ID
    getUsersByCompanyId: async (req: Request, res: Response) => {
        try {
            const users = await db.User.findAll({
                where: {
                    company_id: req.params.companyId,
                },
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', users));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Get user by ID
    getUserById: async (req: Request, res: Response) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'User not found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', user));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Create new user
    createUser: async (req: Request, res: Response) => {
        try {
            const userData = {
                ...req.body,
                role: 'recruiter',
                is_active: true,
            };
            const user = await db.User.create(userData);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', user));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Update user
    updateUser: async (req: Request, res: Response) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'User not found', null));
            }
            await user.update(req.body);
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', user));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },

    // Delete user
    deleteUser: async (req: Request, res: Response) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'User not found', null));
            }
            await user.destroy();
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'User deleted successfully', null));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    },
};
