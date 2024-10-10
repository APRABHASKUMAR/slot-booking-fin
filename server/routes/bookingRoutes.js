import express from 'express';
import Booking from '../models/Booking.js'; // Import the Booking model

const router = express.Router();

router.post('/new', async (req, res) => {
    const { courseId, date, slot, userId } = req.body;

    try {
        const existingBooking = await Booking.findOne({ courseId, date, slot });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked." });
        }

        const newBooking = new Booking({
            userId,
            courseId,
            date,
            slot,
            
        });

        await newBooking.save();
        res.status(200).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;
