import { Application, Router } from 'express';
import authController from '~/controllers/auth.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialAuthRoute(app: Application) {
    route.post('/register', authController.registerUser);
    route.post('/login', authController.loginUser);

    app.use('/api/v1/auth', route);
}
