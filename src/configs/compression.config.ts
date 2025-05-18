import compression from 'compression';
import { Application } from 'express';

export default function configComperssion(app: Application) {
    app.use(compression());
}
