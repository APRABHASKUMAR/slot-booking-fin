import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import authRoute from "./routes/auth.route.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import generatePassword from "generate-password";
import Course from "./models/Course.js";
import Date from "./models/Date.js";
import Slot from "./models/Slot.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const uri = process.env.MONGODB_URI || "your-mongodb-connection-uri";

// MongoDB connection with options
const clientOptions = { 
  dbName: 'data',
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

mongoose.connect(uri, clientOptions)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer SMTP transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Route for sending booking confirmation email
app.post("/api/book/sendEmail", async (req, res) => {
  const {email, courseId, date, slot } = req.body;
  console.log(req.body); 
  const emailBody = `
    <h3>Booking Confirmation</h3>
    <p>Dear ${email},</p>
    <p>Thank you for your booking! Here are your booking details:</p>
    <ul>
      <li><strong>Slot Date:</strong> ${date}</li>
      <li><strong>Slot Time:</strong> ${slot}</li>
    </ul>
    <p>If you have any questions, feel free to contact us!</p>
    <p>Best regards,<br/>The Slot Booking Team</p>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Booking Confirmation',
    html: emailBody
  };

  try {
    console.log('Sending email to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    res.status(200).json({ message: 'Booking confirmed and email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Authentication and booking routes
app.use("/api/auth", authRoute);
app.use('/api/bookings', bookingRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello from the Node API server!");
});

// Middleware for error handling
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API to get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// API to get available dates for a course
app.get('/api/dates', async (req, res) => {
  const { courseId } = req.query;
  try {
    const dates = await Date.find({ courseId });
    res.json(dates);
  } catch (err) {
    console.error("Error fetching dates:", err);
    res.status(500).json({ error: "Failed to fetch dates" });
  }
});

// API to get available slots
app.get('/api/slots', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

// Generate random credentials (for testing)
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

// Protected route (example using token verification)
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "This is a protected route. You have access because you're authenticated.",
    user: req.user,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
