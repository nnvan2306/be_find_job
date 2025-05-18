import { Application, Router } from 'express';
import { jobPostController } from '~/controllers/job_post.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialJobPostRoute(app: Application) {
    route.get('/', jobPostController.getAllJobPosts);
    route.get('/:id', jobPostController.getJobPostById);
    route.post('/', jobPostController.createJobPost);
    route.put('/:id', jobPostController.updateJobPost);
    route.delete('/:id', jobPostController.deleteJobPost);

    app.use('/api/v1/job-posts', route);
}
