"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/patient/verificationService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class verificationService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS,
            },
        });
    }
    SendOtpEmail(to, subject, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.USER_MAIL,
                to,
                subject,
                text: `Your OTP code is ${otp}`,
                html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error("Error sending OTP Email:", error);
                throw new Error("Failed to send OTP Email");
            }
        });
    }
    generateOtp() {
        return otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
    }
}
exports.default = verificationService;
