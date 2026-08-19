"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const notFound_middleware_1 = require("./middleware/notFound.middleware");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((req, _res, next) => {
    console.log("➡️", req.method, req.originalUrl);
    next();
});
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, helmet_1.default)());
app.disable("x-powered-by");
/*
|--------------------------------------------------------------------------
| Clerk Middleware
|--------------------------------------------------------------------------
*/
app.use((0, express_2.clerkMiddleware)());
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "InterviewIQ Backend Running 🚀",
    });
});
app.use("/api", routes_1.default);
app.use(notFound_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
exports.default = app;
