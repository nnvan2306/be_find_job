import { Application, Router } from 'express';
import { companyController } from '~/controllers/company.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const route = Router() as any;

export default function initialCompanyRoute(app: Application) {
    route.get('/', companyController.getAllCompanies);
    route.get('/:id', companyController.getCompanyById);
    route.post('/', companyController.createCompany);
    route.put('/:id', companyController.updateCompany);
    route.delete('/:id', companyController.deleteCompany);

    app.use('/api/v1/companies', route);
}
