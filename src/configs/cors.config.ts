import cors from 'cors';
import 'dotenv/config';
import { Application } from 'express';

export default function configCors(app: Application) {
    const corsOption = {
        origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
    };

    app.use(cors(corsOption));
}
