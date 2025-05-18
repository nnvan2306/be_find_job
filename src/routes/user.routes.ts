import { Application, Router } from 'express';
import userController from '~/controllers/user.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialUserRoute(app: Application) {
    route.get('/', userController.getAllUser);
    route.put('/', userController.updateUser);
    route.delete('/:id', userController.deleteUser);

    app.use('/api/v1/user', route);
}
