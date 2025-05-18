import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import sendResponse from '~/helpers/response';
import db from '~/models';

class CategoryController {
    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await db.category.findByPk(id);
            if (!category) {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json(sendResponse(HttpStatusCode.NotFound, 'category Not Found', null));
            }
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'category', category));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            const categories = await db.category.findAll({
                include: [
                    {
                        model: db.vocabulary,
                    },
                ],
            });
            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'List Category', categories));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const { title } = req.body;
            const category = await db.category.create({ title });
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Create Category Success', category));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const category = await db.category.update({ title }, { where: { id } });
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Update Category Success', category));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await db.category.destroy({ where: { id } });
            return res
                .status(HttpStatusCode.Ok)
                .json(sendResponse(HttpStatusCode.Ok, 'Delete Category Success', category));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }
}

export default new CategoryController();
