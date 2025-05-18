import { Application, Router } from 'express';
import { userController } from '~/controllers/user.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialUserRoute(app: Application) {
    route.get('/', userController.getAllUsers);
    route.get('/company/:companyId', userController.getUsersByCompanyId);
    route.get('/:id', userController.getUserById);
    route.post('/', userController.createUser);
    route.put('/:id', userController.updateUser);
    route.delete('/:id', userController.deleteUser);

    app.use('/api/v1/users', route);
}
