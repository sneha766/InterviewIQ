"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const notFound_middleware_1 = require("./middleware/notFound.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "InterviewIQ Backend Running 🚀",
    });
});
app.use("/api", routes_1.default);
/**
 * 404 Handler
 */
app.use(notFound_middleware_1.notFoundHandler);
/**
 * Global Error Handler
 * Must be the last middleware.
 */
app.use(error_middleware_1.errorHandler);
exports.default = app;
