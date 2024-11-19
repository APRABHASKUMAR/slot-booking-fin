import express from 'express';
import Booking from '../models/Booking.js';
import { checkAccess } from './middleware/rbac.js';
import { verifyToken } from './middleware/authMiddleware.js'; // Assuming you have this middleware

const router = express.Router();

router.post('/api/admin/courses', verifyToken, checkAccess('createAny', 'course'), async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    try {
      const newCourse = new Course({
        name,
        description,
        startDate,
        endDate
      });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
});

router.get('/api/admin/bookings', verifyToken, checkAccess('readAny', 'booking'), async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('course');
        res.json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
      }
});

export default router;
