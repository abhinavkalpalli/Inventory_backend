"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(body_parser_1.default.json());
const dbUrl = process.env.DB_URL || " ";
const port = parseInt(process.env.PORT || "3200");
mongoose_1.default.connect(dbUrl)
    .then(() => {
    console.log('Database connected..');
})
    .catch((err) => {
    console.error('Database connection error:', err);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
