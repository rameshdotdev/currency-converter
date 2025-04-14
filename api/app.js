import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();

// Middleware
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Health check endpoint
app.get("/api/health", (_, res) => {
	res.json({
		status: "ok",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

// Routes

// Error handling middleware
app.use(errorHandler);

export default app;