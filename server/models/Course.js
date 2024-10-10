import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ensuring that each course ID is unique
  },
  name: {
    type: String,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
