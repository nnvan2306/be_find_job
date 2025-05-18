import { Application, Router } from 'express';
import jobCategoryController from '~/controllers/job_category.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialJobCategoryRoute(app: Application) {
    route.get('/', jobCategoryController.getAllJobCategories);
    route.get('/job/:jobId', jobCategoryController.getJobCategoriesByJobId);
    route.post('/', jobCategoryController.addCategoryToJob);
    route.delete('/:job_post_id/:category_id', jobCategoryController.removeCategoryFromJob);

    app.use('/api/v1/job-categories', route);
}
