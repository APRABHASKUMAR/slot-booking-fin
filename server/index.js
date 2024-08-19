import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
const app = express();
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import bodyParser  from "body-parser";
dotenv.config();

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
app.listen(5000, () => {
  console.log("Server is running on port 5000")
})

app.use("/api/auth", authRoute);
