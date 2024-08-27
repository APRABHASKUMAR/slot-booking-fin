import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import bodyParser from "body-parser";


dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB is connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};


connectDB();


app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth", authRoute);


app.get('/', (req, res) => {
  res.send("Hello from the Node API server!");
});


app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
