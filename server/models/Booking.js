import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
