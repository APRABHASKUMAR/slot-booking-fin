import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
const app = express();
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import bodyParser  from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generatePassword from "generate-password";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB is connected!')).catch(err => console.log(err));


// CORS

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


// BODY PARSER
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello from the Node API server!")
})
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get courses
app.get('/api/courses', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'coursesData.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read courses data' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to get available dates for a course
app.get('/api/dates', (req, res) => {
    const courseId = req.query.courseId;
    // if (!courseId) {
    //   return res.status(400).json({ error: 'Course ID is required' });
    // } 
    fs.readFile(path.join(__dirname, 'data', 'datesData.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read dates data' });
        }
        const datesData = JSON.parse(data);
        const dates = datesData[courseId] || [];
        res.json(datesData);
    });
});

// Endpoint to get available slots for a course and date
app.get('/api/slots', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'slotsData.json'), 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to read courses data' });
      }
      res.json(JSON.parse(data));
  });
});

//Endpoint to generate random username and password
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

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})

app.use("/api/auth", authRoute);
