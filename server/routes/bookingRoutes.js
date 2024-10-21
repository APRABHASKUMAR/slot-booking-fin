import express from 'express';
import Booking from '../models/Booking.js'; // Import the Booking model

const router = express.Router();

router.post('/new', async (req, res) => {
    const { courseId, date, slot, userId } = req.body;

    try {
        // Normalize the date format to YYYY-MM-DD
        const normalizedDate = new Date(date).toISOString().split('T')[0];

        const existingBooking = await Booking.findOne({ courseId, date, slot });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked." });
        }

        const newBooking = new Booking({
            userId,
            courseId,
            date: normalizedDate,
            slot,
            
        });

        await newBooking.save();
        res.status(200).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Endpoint to fetch upcoming bookings for a specific user
router.get('/upcoming', async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
      // Fetch bookings where date is greater than or equal to today
      const upcomingBookings = await Booking.find({
        userId,
        date: { $gte: today }
      });
  
      if (upcomingBookings.length === 0) {
        return res.status(404).json({ error: 'No upcoming bookings found' });
      }
  
      res.json(upcomingBookings);
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;
