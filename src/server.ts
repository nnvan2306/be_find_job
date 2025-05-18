import 'dotenv/config';
import express, { Application } from 'express';
import configComperssion from './configs/compression.config';
import { startAndConnectDB } from './configs/connectDb.config';
import configCors from './configs/cors.config';
import configRequest from './configs/req.config';
import initialAuthRoute from './routes/auth.routes';
import initialUploadRoute from './routes/upload.routes';
import initialUserRoute from './routes/user.routes';
import initialCategoryRoute from './routes/category.routes';

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

app.listen(PORT, () => {
    console.log('App Start Successfully With Port: ' + PORT);
});
