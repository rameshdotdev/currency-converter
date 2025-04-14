import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDb from "./config/connection.js";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT || 3000;
const HOST = "localhost";

const server = app.listen(port, HOST, () => {
	console.log(`Server is running on port ${port}`);
});

const startServer = async () => {
	try {
		await connectDb(process.env.CONNECTION_STRING);
		console.log("MongoDB Connected Successfully");
	} catch (error) {
		console.error("MongoDB Connection Error:", error);
		process.exit(1);
	}
};

// Graceful shutdown
const shutdown = async () => {
	console.log("Shutting down server...");
	server.close(async () => {
		console.log("Server closed");
		await mongoose.connection.close();
		console.log("MongoDB connection closed");
		process.exit(0);
	});
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();