import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import "antd/dist/reset.css";
import generatePassword from "generate-password";
import Course from "./models/Course.js";
import Date from "./models/Date.js";
import Slot from "./models/Slot.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// MongoDB connection URI
const uri = "mongodb+srv://apk543211:9lqUI672YOTfAwS7@slot-booking.d889hko.mongodb.net/?retryWrites=true&w=majority&appName=slot-booking";

const clientOptions = { 
  dbName: 'data', // Specify the database name here
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

// Connect to MongoDB without disconnecting
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send("Hello from the Node API server!");
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: err.message || "Internal Server Error",
    });
  }
});


// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    console.log('Courses found:', courses);  // Log fetched courses
    if (courses.length === 0) {
      console.log('No courses found, check collection and data.');
    }
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);  // Log any errors
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});



// Endpoint to get available dates for a course
app.get('/api/dates', async (req, res) => {
  const courseId = req.query.courseId;
  try{
    const dates = await Date.find({ courseId: courseId });
    console.log("Dates found:", dates);
    if (dates.length == 0){
      console.log("No dates found, check data.");
    }
    res.json(dates);
  } catch (err) {
    console.error("Error fetching dates:", err);
    res.status(500).json({error: "Failed to fetch dates"});
  }

  // const courseId = req.query.courseId;
  // fs.readFile(path.join(__dirname, 'data', 'datesData.json'), 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).json({ error: 'Failed to read dates data' });
  //   }
  //   const datesData = JSON.parse(data);
  //   const dates = datesData[courseId] || [];
  //   res.json(datesData);
  // });
});

// Endpoint to get available slots for a course and date
app.get('/api/slots', async (req, res) => {
  try{
    const slots = await Slot.find();
    console.log("Slots found:", slots);
    if (slots.length == 0){
      console.log("No slots found, check data.");
    }
    res.json(slots);
  } catch (err) {
    console.error("Error fetching dates:", err);
    res.status(500).json({error: "Failed to fetch dates"});
  }
});

// Endpoint to generate random username and password
app.get('/api/generate-credentials', (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
