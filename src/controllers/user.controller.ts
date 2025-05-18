import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { endCodePassword } from '~/helpers/bcrypt';
import sendResponse from '~/helpers/response';
import db from '~/models';

class UserController {
    async getAllUser(req: Request, res: Response) {
        try {
            const listUser = await db.user.findAll();
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'List User', listUser));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.body;
            // const passwordHash = endCodePassword(password);
            // console.log('check req.body: ', req.body);

            const userUpdate = await db.user.update(
                {
                    ...req.body,
                    username: req.body.username,
                    // password: passwordHash,
                },
                {
                    where: { id },
                },
            );

            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Update User Success', userUpdate));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userDelete = await db.user.destroy({
                where: { id },
            });

            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Delete User Success', userDelete));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new UserController();
