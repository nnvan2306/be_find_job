import { Application, Router } from 'express';
import savedJobController from '~/controllers/saved_job.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialSavedJobRoute(app: Application) {
    route.get('/', savedJobController.getAllSavedJobs);
    route.get('/user/:userId', savedJobController.getSavedJobByUserId);
    route.post('/', savedJobController.saveJob);
    route.delete('/:user_id/:job_post_id', savedJobController.unsaveJob);

    app.use('/api/v1/saved-jobs', route);
}
