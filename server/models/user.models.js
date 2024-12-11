import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'lab_instructor', 'central_admin'],
    default: 'student', // Default to 'student' if not specified
  },
});

export default mongoose.model('User', UserSchema);
