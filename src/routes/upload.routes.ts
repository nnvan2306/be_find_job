import { HttpStatusCode } from 'axios';
import 'dotenv/config';
import { Application, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import sendResponse from '~/helpers/response';
import { uploadMulter } from '~/middlewares/muiter';

const route = Router();

export default function initialUploadRoute(app: Application) {
    route.post('/single', uploadMulter.single('file'), (req: Request, res: Response) => {
        if (!req.file) {
            res.status(HttpStatusCode.BadRequest).json(
                sendResponse(HttpStatusCode.BadRequest, 'File is required', null),
            );
        } else {
            res.status(HttpStatusCode.Ok).json(
                sendResponse(
                    HttpStatusCode.Ok,
                    'Ok',
                    `http://localhost:${process.env.PORT}/api/v1/upload/file/${req.file.filename}`,
                ),
            );
        }
    });

    // route.get('/file/:filename', (req: Request, res: Response) => {
    //     const { filename } = req.params;
    //     const filePath = path.join(__dirname, '../upload', filename);

    //     if (!fs.existsSync(filePath)) {
    //         res.status(HttpStatusCode.NotFound).json(sendResponse(HttpStatusCode.NotFound, 'File not found', null));
    //     } else {
    //         res.sendFile(filePath);
    //     }
    // });

    route.get('/file/:filename', (req: Request, res: Response) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../upload', filename);

        if (!fs.existsSync(filePath)) {
            res.status(404).json(sendResponse(404, 'File not found', null));
            return;
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });

    app.use('/api/v1/upload', route);
}
