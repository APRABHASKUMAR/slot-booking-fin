import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import generatePassword from "generate-password";
import { verifyToken } from "./middleware/authMiddleware.js"; // Middleware for authentication
import jwt from "jsonwebtoken"; // JWT for token handling

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || "your-mongodb-connection-uri";

// MongoDB connection options
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };

// Connect to MongoDB
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });

// CORS configuration for frontend requests
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true
}));

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for authentication-related requests
app.use("/api/auth", authRoute);

// Home route (basic API response)
app.get("/", (req, res) => {
  res.send("Hello from the Node API server!");
});

// Error handling middleware for handling server errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Middleware to serve static files (e.g., for a React build)
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to get courses (reads data from a local JSON file)
app.get("/api/courses", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "coursesData.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read courses data" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to get available dates for a specific course (based on courseId)
app.get("/api/dates", (req, res) => {
  const courseId = req.query.courseId;
  fs.readFile(path.join(__dirname, "data", "datesData.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read dates data" });
    }
    const datesData = JSON.parse(data);
    const dates = datesData[courseId] || [];
    res.json(datesData);
  });
});

// Endpoint to get available slots for a specific course and date
app.get("/api/slots", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "slotsData.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read slots data" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to generate random username and password (for testing purposes)
app.get("/api/generate-credentials", (req, res) => {
  const username = generatePassword.generate({
    length: 5,
    numbers: true
  });

  const password = generatePassword.generate({
    length: 8,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true
  });

  res.json({ username, password });
});

// Protected route example (only accessible by authenticated users with a valid token)
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "This is a protected route. You have access because you're authenticated.",
    user: req.user, // The authenticated user's data is available here
  });
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});