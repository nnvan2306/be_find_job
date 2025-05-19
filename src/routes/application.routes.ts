import { Application, Router } from 'express';
import { applicationController } from '~/controllers/application.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialApplicationRoute(app: Application) {
    route.get('/', applicationController.getAllApplications);
    route.get('/:id', applicationController.getApplicationById);
    route.post('/', applicationController.createApplication);
    route.put('/:id', applicationController.updateApplication);
    route.delete('/:id', applicationController.deleteApplication);
    route.get('/user/:userId', applicationController.getApplicationsByUser);
    route.get('/job/:jobPostId', applicationController.getApplicationsByJobPost);

    app.use('/api/v1/applications', route);
}
