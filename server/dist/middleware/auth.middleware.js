"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader ||
        !authHeader.startsWith("Bearer ")) {
        throw new AppError_1.default("Unauthorized.", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        throw new AppError_1.default("Invalid token.", 401);
    }
};
exports.authenticate = authenticate;
