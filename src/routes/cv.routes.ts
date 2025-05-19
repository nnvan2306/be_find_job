import { Application, Router } from 'express';
import cvController from '~/controllers/cv.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialCVRoute(app: Application) {
    route.get('/', cvController.getAllCVs);
    route.get('/:id', cvController.getCVById);
    route.post('/', cvController.createCV);
    route.put('/:id', cvController.updateCV);
    route.delete('/:id', cvController.deleteCV);
    route.put('/set-main/:id', cvController.setMain);
    route.put('/set-share/:id', cvController.setShare);

    app.use('/api/v1/cvs', route);
}
