import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { comparePassword, endCodePassword } from '~/helpers/bcrypt';
import sendResponse from '~/helpers/response';
import db from '~/models';

class AuthController {
    async registerUser(req: Request, res: Response) {
        try {
            const checkUserExits = await db.user.findOne({
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
            const userCreate = await db.user.create({
                email: req.body.email,
                password: passwordHash,
                username: req.body.username,
                role: db.ROLES[0],
            });
            const userSave = await userCreate.save();

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Thành công', userSave));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const checkUserExits = await db.user.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (!checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Not Found', null));
            }

            const isCheckPassword = comparePassword(req.body.password, checkUserExits.password);

            if (!isCheckPassword) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Password Not Match', null));
            }

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Login Success', checkUserExits));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new AuthController();
