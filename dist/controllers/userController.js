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
const userService_1 = __importDefault(require("../services/userService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verificationService_1 = __importDefault(require("../services/verificationService"));
class userController {
    constructor() {
        this._userService = new userService_1.default();
        this._verificationService = new verificationService_1.default();
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { email, password: hashedPassword };
                const userData = yield this._userService.register(data);
                if (userData == null) {
                    return res.status(402).json({ message: "User already exists" });
                }
                else {
                    const otp = this._verificationService.generateOtp();
                    yield this._verificationService.SendOtpEmail(email, "Your OTP Code", otp);
                    return res.status(201).json({
                        message: "Admin registered successfully and OTP sent",
                        email,
                        otp,
                    });
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = userController;
