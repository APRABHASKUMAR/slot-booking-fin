import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,  // Ensures each course has a unique ID
  },
  courseName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
});

const CourseEntry = mongoose.model('CourseEntry', courseSchema);

export default CourseEntry;
