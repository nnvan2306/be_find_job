import { Application, Router } from 'express';
import reportController from '~/controllers/report.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialReportRoute(app: Application) {
    route.get('/', reportController.getAllReports);
    route.get('/:id', reportController.getReportById);
    route.post('/', reportController.createReport);
    route.put('/:id', reportController.updateReport);
    route.delete('/:id', reportController.deleteReport);

    app.use('/api/v1/reports', route);
}
