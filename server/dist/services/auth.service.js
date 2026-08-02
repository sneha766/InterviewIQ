"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const jwt_1 = require("../utils/jwt");
const auth_schema_1 = require("../schemas/auth.schema");
const register = async (body) => {
    // Validate Request Body
    const data = auth_schema_1.registerSchema.parse(body);
    // Check if user already exists
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new AppError_1.default("Email already registered.", 409);
    }
    // Hash Password
    const hashedPassword = await bcrypt_1.default.hash(data.password, 12);
    // Create User
    const user = await prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    // Generate JWT
    const token = (0, jwt_1.generateAccessToken)(user.id);
    return {
        success: true,
        message: "Registration successful.",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
};
exports.register = register;
const login = async (body) => {
    // Validate Request Body
    const data = auth_schema_1.loginSchema.parse(body);
    // Find User
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        throw new AppError_1.default("Invalid email or password.", 401);
    }
    // Compare Password
    const isPasswordCorrect = await bcrypt_1.default.compare(data.password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.default("Invalid email or password.", 401);
    }
    // Generate JWT
    const token = (0, jwt_1.generateAccessToken)(user.id);
    return {
        success: true,
        message: "Login successful.",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
};
exports.login = login;
