import { Application, Router } from 'express';
import categoryController from '~/controllers/category.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialCategoryRoute(app: Application) {
    route.get('/:id', categoryController.getCategoryById);
    route.get('/', categoryController.getAllCategory);
    route.post('/', categoryController.createCategory);
    route.put('/:id', categoryController.updateCategory);
    route.delete('/:id', categoryController.deleteCategory);

    app.use('/api/v1/category', route);
}
