import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import db from '~/configs/connectDb.config';
import { endCodePassword } from '~/helpers/bcrypt';
import sendResponse from '~/helpers/response';

export const userController = {
    // Get all users
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const company_id = req.query.company_id as string;

            const whereCondition = company_id ? { company_id: Number(company_id) } : undefined;

            const users = await db.User.findAll({
                where: whereCondition,
            });

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
            const checkUserExits = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Exits', null));
            }

            const passwordHash = endCodePassword(req.body.password);
            const userCreate = await db.User.create({
                email: req.body.email,
                password: passwordHash,
                full_name: req.body.username,
                role: 'recruiter',
                is_active: true,
            });
            const userSave = await userCreate.save();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', userSave));
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
