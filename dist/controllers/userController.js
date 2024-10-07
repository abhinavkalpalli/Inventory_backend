"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class userController {
    constructor() {
        this._userService = new userService_1.default;
        this._userService = new userService_1.default();
    }
}
exports.default = userController;
