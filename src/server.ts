import 'dotenv/config';
import express, { Application } from 'express';
import configComperssion from './configs/compression.config';
import { startAndConnectDB } from './configs/connectDb.config';
import configCors from './configs/cors.config';
import configRequest from './configs/req.config';
import initialAuthRoute from './routes/auth.routes';
import initialCategoryRoute from './routes/category.routes';
import initialCompanyRoute from './routes/company.routes';
import initialCVRoute from './routes/cv.routes';
import initialJobCategoryRoute from './routes/job_category.routes';
import initialJobPostRoute from './routes/job_post.routes';
import initialReportRoute from './routes/report.routes';
import initialSavedJobRoute from './routes/saved_job.routes';
import initialUploadRoute from './routes/upload.routes';
import initialUserRoute from './routes/user.routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8080');

// load configs
configComperssion(app);
configCors(app);
configRequest(app);

// config database
startAndConnectDB();

// router
initialUploadRoute(app);
initialAuthRoute(app);
initialUserRoute(app);
initialCategoryRoute(app);
initialCompanyRoute(app);
initialCVRoute(app);
initialReportRoute(app);
initialSavedJobRoute(app);
initialJobCategoryRoute(app);
initialJobPostRoute(app);

app.listen(PORT, () => {
    console.log('App Start Successfully With Port: ' + PORT);
});
