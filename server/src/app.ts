import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import apiRoutes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

/*
|--------------------------------------------------------------------------
| Clerk Middleware
|--------------------------------------------------------------------------
*/

app.use(clerkMiddleware());

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "InterviewIQ Backend Running 🚀",
    });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;