import { Router } from 'express';
import companyRoutes from './company.routes';
import jobPostRoutes from './job_post.routes';
import userRoutes from './user.routes';

const router = Router();

// API routes
router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/job-posts', jobPostRoutes);

export default router;
