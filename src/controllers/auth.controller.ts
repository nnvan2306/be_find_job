import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import db from '~/configs/connectDb.config';
import { comparePassword, endCodePassword } from '~/helpers/bcrypt';
import sendResponse from '~/helpers/response';

const ROLES = ['applicant', 'recruiter', 'company', 'admin'] as const;
type Role = (typeof ROLES)[number];

class AuthController {
    async registerUser(req: Request, res: Response) {
        try {
            const checkUserExits = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Exits', null));
            }

            const passwordHash = endCodePassword(req.body.password);
            const userCreate = await db.User.create({
                email: req.body.email,
                password: passwordHash,
                full_name: req.body.username,
                role: ROLES[0] as Role,
                is_active: true,
            });
            const userSave = await userCreate.save();

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Thành công', userSave));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const checkUserExits = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (!checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Not Found', null));
            }

            const isCheckPassword = comparePassword(req.body.password, checkUserExits.password);

            if (!isCheckPassword) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Password Not Match', null));
            }

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Login Success', checkUserExits));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async sendOTPChangePass(req: Request, res: Response) {
        try {
            if (!req.query.email) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Not Found', null));
            }

            const checkUserExits = await db.User.findOne({
                where: {
                    email:
                        typeof req.query.email === 'string'
                            ? req.query.email.trim()
                            : Array.isArray(req.query.email)
                              ? req.query.email[0]?.toString().trim()
                              : '',
                },
            });

            if (!checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Not Found', null));
            }

            const OTP = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: true,
            });

            await db.User.update(
                {
                    code: OTP,
                },
                {
                    where: {
                        id: checkUserExits.id,
                    },
                },
            );

            await AuthController.SendEmailToCustomer({
                email: checkUserExits.email,
                contentHtml: `<h1>OTP: ${OTP}</h1>`,
            });

            return res.status(HttpStatusCode.Ok).json(sendResponse(HttpStatusCode.Ok, 'Success', checkUserExits));
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    async verifyOTPChangePass(req: Request, res: Response) {
        try {
            if (!req.body.otp || !req.body.password || !req.body.email) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'OTP Not Found', null));
            }

            const checkUserExits = await db.User.findOne({
                where: {
                    email:
                        typeof req.body.email === 'string'
                            ? req.body.email.trim()
                            : Array.isArray(req.body.email)
                              ? req.body.email[0]?.toString().trim()
                              : '',
                },
            });

            if (!checkUserExits) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'Email Not Found', null));
            }

            if (checkUserExits.code !== req.body.otp) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(sendResponse(HttpStatusCode.BadRequest, 'OTP wrong', null));
            }
            const passwordHash = endCodePassword(req.body.password);
            await db.User.update(
                {
                    password: passwordHash,
                    code: '',
                },
                {
                    where: {
                        id: checkUserExits.id,
                    },
                },
            );

            return res
                .status(HttpStatusCode.Ok)
                .json(
                    sendResponse(HttpStatusCode.Ok, 'Đổi mật khẩu thành công vui lòng đăng nhập lại', checkUserExits),
                );
        } catch (error) {
            return res
                .status(HttpStatusCode.BadGateway)
                .json(sendResponse(HttpStatusCode.BadGateway, `${error}`, null));
        }
    }

    static async SendEmailToCustomer(data: { email: string; contentHtml: string }) {
        // eslint-disable-next-line prefer-const
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            // debug: true,
            // logger: true,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'truongsonpt.80@gmail.com', // generated ethereal user
                pass: 'gptr aigz dful wstk', // generated ethereal password
            },
        });

        await transporter.sendMail({
            from: 'Tim Viec', // sender address
            to: data.email, // list of receivers
            subject: `Xin chao OTP cua ban`, // Subject line
            html: data.contentHtml, // html body
        });
    }
}

export default new AuthController();
