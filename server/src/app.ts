import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import apiRoutes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

import helmet from "helmet";


const app = express();

app.use((req, _res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});
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
app.use(helmet());



app.disable("x-powered-by");
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